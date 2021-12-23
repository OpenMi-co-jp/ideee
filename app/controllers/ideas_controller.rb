class IdeasController < ApplicationController
  prepend_before_action :set_idea, only: %i[ show edit update destroy publish ]
  before_action :authenticate_user!, except: %i[ index show search tags ]
  before_action :own_user_check, only: %i[ edit update destroy ]
  before_action :defined_check, except: %i[ index show search tags]
  before_action :own_draft_check, only: %i[ show ]

  def index
    @ideas = Idea.published.recent_select # 一度定義することで何度もDBに値を取りに行くことを阻止
    @latest_ideas = @ideas.order(published_at: "DESC").first(10)
    @liked_ideas = @ideas.order(likes_num: "DESC").first(5)
    @most_viewed_ideas = @ideas.order(view: "DESC").first(5)
    @most_commented_ideas = @ideas.most_commented.first(5)
    @featured_users = User.where(defined: true).order(point: "DESC").first(10) # 定義がされているユーザーだけをポイントが高い準に5名
    # 1週間以内にコメントを追加したユーザーのIDとコメント数とピックアップ
    @commented_users_array = Comment.weekly_comments.pickup_user_commets(t('default.users.weekly_comments_num'))
    @weekly_commented_users = @commented_users_array.map{|u| User.find(u[0])}
  end

  def show
    @title = @idea.name
    @user = User.find_by(id: @idea.user_id)
    @levels = Difficulty.levels
    if Rails.env.production?
      @idea.views_update(params[:id]) # 本番環境のみ、アイデアに対するView数をAPIで取得
      @time_on_page = Analytics.new.idea_report('avgTimeOnPage', params[:id]) || '-' # 製作者にのみ見える、アイデアページの滞在時間を設定
    else
      @time_on_page = '-'
    end
    gon.idea_id = @idea.id # JSにアイデアのIDを渡す
  end

  def new
    @idea = Idea.new(note: t('.default_set')) # アイデア新規作成時のフォーマットを設定
  end

  def edit; end

  def create
    @idea = Idea.new(idea_params)
    if @idea.save_with_tags(tags_params)
      if draft_bool
        redirect_to @idea, notice: t('.draft_save')
      else
        TwitterTweet.new.tweet(@idea, idea_url(@idea.id)) if Rails.env.production?
        SlackNotifier.new.send(@idea, idea_url(@idea.id)) if Rails.env.production?
        SlackNotifier.new.apply_send(@idea, idea_url(@idea.id))
        @idea.update!(published_at: Time.now)
        redirect_to @idea, notice: t('.success')
      end
    else
      flash.now[:alert] = t('.fail')
      render :new
    end
  end

  def update
    @idea.assign_attributes(idea_params)
    if @idea.save_with_tags(tags_params)
      if params[:commit] == t('default.publish') && Rails.env.production?
        TwitterTweet.new.tweet(@idea, idea_url(@idea.id))
        SlackNotifier.new.send(@idea, idea_url(@idea.id))
        @idea.update!(published_at: Time.now)
      end
      SlackNotifier.new.apply_send(@idea, idea_url(@idea.id))
      message = draft_bool ? t('.draft_save') : t('.success')
      redirect_to @idea, notice: message
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
    # アイデアに紐づくlikeの数を数えて、降順に並べる
    @sort = params[:sort] || "likes_num"
    @order = params[:order] || "desc"
    @keyword = params[:keyword]
    # TODO: 検索結果が増えてきたらtag検索を分ける
    ideas = Idea.published.search(name: @keyword, difficulty: params[:difficulty]) | Idea.published.tag_name_like(@keyword)
    list = Idea.where(id: ideas.map(&:id)).order("#{@sort}": @order)
    @searched_ideas = Kaminari.paginate_array(list).page(params[:page])
    current_page = params[:page].nil? ? 1 : params[:page].to_i
    @rank_num = (current_page - 1) * @searched_ideas.limit_value
    @deployed_ideas = Idea.deployed.order(updated_at: "DESC").first(10)
  end

  def tags
    @sort = params[:sort] || "likes_num"
    @order = params[:order] || "desc"
    @tag_name = params[:keyword]
    list = Idea.with_tag(@tag_name).order("#{@sort}": @order)
    @tagged_ideas = Kaminari.paginate_array(list).page(params[:page])
  end

  def publish
    @idea.update(draft: false, published_at: Time.now)
    TwitterTweet.new.tweet(@idea, idea_url(@idea.id)) if Rails.env.production?
    SlackNotifier.new.send(@idea, idea_url(@idea.id)) if Rails.env.production?
    SlackNotifier.new.apply_send(@idea, idea_url(@idea.id))
    redirect_to @idea, notice: t('.success')
  end

  private
    def set_idea
      @idea = Idea.find(params[:id])
    end

    # ストロングパラメーターを設定
    def idea_params
      params.require(:idea)
            .permit(:name, :icon, :note, :view, :user_id, :commit, :product_url)
            .merge(user_id: current_user.id)
            .merge(draft: draft_bool)
    end

    def own_user_check
      unless current_user.own?(@idea)
        redirect_to root_path
        flash[:alert] = t('default.message.unauthorized')
      end
    end

    def tags_params
      params.dig(:idea, :tag_list)&.split(",")&.uniq
    end

    def draft_bool
      params[:commit] == t('default.save_draft')
    end

    def own_draft_check
      return if !@idea.draft || current_user.own?(@idea)
      redirect_to root_path
      flash[:alert] = t('default.message.unauthorized')
    end
end
