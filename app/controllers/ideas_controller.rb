# frozen_string_literal: true

class IdeasController < ApplicationController
  prepend_before_action :set_idea, only: %i[show edit update destroy publish suggest]
  before_action :authenticate_user!,
                except: %i[index show search tags most_comment most_liked team_active deployed suggest]
  before_action :own_user_check, only: %i[edit update destroy]
  before_action :defined_check, except: %i[index show search tags most_comment most_liked team_active deployed suggest]
  before_action :own_draft_check, only: %i[show]
  after_action :update_user_point, only: %i[create]

  def index
    recent_ideas = Idea.published.recent_select.eager_load([:user])
    @latest_ideas = recent_ideas.order(published_at: 'DESC').first(10)
  end

  def show
    if Rails.env.production?
      AnalyticsJob::UpdateViewsJob.perform_later(params[:id]) # 本番環境のみ、アイデアに対するView数をAPIで取得
      # 製作者にのみ見える、アイデアページの滞在時間を設定
      @time_on_page = Analytics.new.idea_report('avgTimeOnPage', params[:id])
    else
      @time_on_page = '-'
    end
    @comments = @idea.comments.eager_load(:user).preload(:likes)
  end

  def new
    @idea = Idea.new
  end

  def edit; end

  def create
    @idea = Idea.new(idea_params)
    if @idea.save_with_tags(tags_params)
      if draft_bool
        redirect_to @idea, notice: t('.draft_save')
      else
        destination = if params.dig(
          :idea,
                          :stance
        ) == 'team_project'

                        new_team_path(idea_id: @idea)
                      else
                        idea_path(@idea, share: true)
                      end
        sidekiq_jobs
        @idea.update_attribute(:published_at, Time.zone.now)
        redirect_to destination, notice: t('.success')
      end
    else
      flash.now[:alert] = t('.fail')
      render :new
    end
  end

  def update
    @idea.assign_attributes(idea_params)
    if @idea.save_with_tags(tags_params)
      if draft_bool
        redirect_to @idea, notice: t('.draft_save')
      else
        if params[:commit] == t('default.publish')
          sidekiq_jobs
          destination = idea_path(@idea, share: true)
          @idea.update_attribute(:published_at, Time.zone.now)
        end
        destination = new_team_path(idea_id: @idea) if params.dig(:idea, :stance) == 'team_project'
        destination ||= @idea
        Slack::SendApplyJob.perform_later(@idea, idea_url(@idea.id)) if Rails.env.production?
        redirect_to destination, notice: t('.success')
      end
    else
      flash.now[:alert] = t('.fail')
      render :edit
    end
  end

  def destroy
    @idea.destroy
    redirect_to ideas_url, notice: t('.success')
  end

  def search
    @q = Idea.published.eager_load(%i[idea_tags taggings]).preload(:user, :team).ransack(ransack_params)
    @q.sorts = 'team_members_num desc' if @q.sorts.empty?
    @searched_ideas = @q.result
    @paged_ideas = Kaminari.paginate_array(@searched_ideas).page(params[:page])
    current_page = params[:page].nil? ? 1 : params[:page].to_i
    @rank_num = (current_page - 1) * @paged_ideas.limit_value
    @deployed_ideas = Idea.deployed.preload(:user).order(published_at: 'DESC').first(10)
  end

  def publish
    @idea.update!(draft: false, published_at: Time.zone.now)
    sidekiq_jobs
    redirect_to idea_path(@idea, share: true), notice: t('.success')
  end

  def suggest
    same_tag_ideas = @idea.same_tag_ideas # 2度以上クエリを走らせないように設定
    if same_tag_ideas.length.positive? # タグがあり、かつ同じタグのアイデアがある場合
      title = '同じタグのアイデア'
      suggest_ideas = same_tag_ideas.sample(3)
    elsif @idea.same_user_other_ideas.length.positive? # 自分が作成したアイデアが1つ以上ある場合
      title = '投稿者の他アイデア'
      suggest_ideas = @idea.same_user_other_ideas.sample(3)
    else
      title = '他アイデアをのぞいてみる'
      suggest_ideas = Idea.published.eager_load(%i[idea_tags taggings]).sample(3)
    end
    render partial: 'suggest', locals: { suggest_ideas:, title: }
  end

  def most_comment
    idea_list = Idea.published.recent_select.eager_load([:user]).most_commented.first(10)
    render partial: 'ideas/index/rank_list', locals: { ideas: idea_list }
  end

  def most_liked
    idea_list = Idea.published.recent_select.eager_load([:user]).most_liked.first(5)
    render partial: 'ideas/index/rank_list', locals: { ideas: idea_list }
  end

  def team_active
    idea_list = Idea.eager_load(:team).where(team: { status: :active }).preload(:idea_tags).eager_load(:user).sample(5)
    render partial: 'ideas/index/rank_list', locals: { ideas: idea_list }
  end

  def deployed
    idea_list = Idea.published.eager_load(:user).preload(:idea_tags).deployed.sample(5)
    render partial: 'ideas/index/rank_list', locals: { ideas: idea_list }
  end

  def joined_team
    idea_ids = TeamUser.eager_load(:team).where(user_id: params[:user_id]).map(&:team).pluck(:idea_id)
    idea_list = Idea.where(id: idea_ids).eager_load(:user).preload(:idea_tags)
    # ユーザー詳細画面のページネーション不具合対応のため、一時的に別パーシャルに退避
    render partial: 'common/joined_team_column_board', locals: { ideas: idea_list }
  end

  private

  def set_idea
    @idea = Idea.find(params[:id])
  end

  # ストロングパラメーターを設定
  def idea_params
    params.require(:idea)
          .permit(
            :name, :icon, :background, :issue, :goal, :wish_function, :hypothesis, :target, :monetize, :similar, :github_url, :note, :view, :stance, :user_id, :commit, :product_url
          )
          .merge(user: current_user, draft: draft_bool)
  end

  def ransack_params
    if params[:q]
      day_from = params[:q][:published_at_gteq]
      params[:q][:published_at_gteq] = day_from.to_date.beginning_of_day if day_from.present?

      day_to = params[:q][:published_at_lteq]
      params[:q][:published_at_lteq] = day_to.to_date.end_of_day if day_to.present?
    end

    params[:q]
  end

  def own_user_check
    return if current_user.own?(@idea)

    redirect_to root_path
    flash[:alert] = t('default.message.unauthorized')
  end

  def tags_params
    params.dig(:idea, :tag_list)&.split(',')&.uniq
  end

  def draft_bool
    params[:commit] == t('default.save_draft')
  end

  def own_draft_check
    return if !@idea.draft || current_user.own?(@idea)

    redirect_to root_path
    flash.now[:alert] = t('default.message.unauthorized')
  end

  def sidekiq_jobs
    return unless Rails.env.production?

    TwitterJob::Tweet.perform_later(@idea, idea_url(@idea.id))
    Slack::SendNewJob.perform_later(@idea, idea_url(@idea.id))
    Slack::SendApplyJob.perform_later(@idea, idea_url(@idea.id))
  end
end
