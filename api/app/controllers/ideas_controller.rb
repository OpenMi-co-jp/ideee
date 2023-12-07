# frozen_string_literal: true

class IdeasController < ApplicationController
  prepend_before_action :set_idea, only: %i[suggest]
  before_action :authenticate_user!, except: %i[tags most_comment suggest]
  before_action :defined_check, except: %i[tags most_comment suggest]

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

  def joined_team
    idea_ids = TeamUser.eager_load(:team).where(user_id: params[:user_id]).map(&:team).pluck(:idea_id)
    idea_list = Idea.where(id: idea_ids).eager_load(:user).preload(:idea_tags)
    render partial: 'common/column_board', locals: { ideas: idea_list }
  end

  private

  def set_idea
    @idea = Idea.find(params[:id])
  end

  def sidekiq_jobs
    return unless Rails.env.production?

    TwitterJob::Tweet.perform_later(@idea, idea_url(@idea.id))
    Slack::SendNewJob.perform_later(@idea, idea_url(@idea.id))
    Slack::SendApplyJob.perform_later(@idea, idea_url(@idea.id))
  end
end
