# frozen_string_literal: true

class UsersController < ApplicationController
  before_action :authenticate_user!, except: %i[index show search commenter idea_man]
  prepend_before_action :page_user, only: %i[show]
  before_action :defined_check, except: %i[index search commenter idea_man], if: :own_user?

  def index
    @users = Kaminari.paginate_array(User.defined_user.order(point: 'DESC'))
                     .page(params[:page])
    current_page = params[:page].nil? ? 1 : params[:page].to_i
    @rank_num = (current_page - 1) * @users.limit_value
  end

  def show
    @user_published_ideas = @user.ideas.published
    @published_list = @user_published_ideas.eager_load(:idea_tags).order(published_at: 'DESC')
    @published_ideas = Kaminari.paginate_array(@published_list).page(params[:published].try(:[], :page)).per(10)
    @liked_idea_ids = @user.likes.type_idea_ids
    @like_ideas = Kaminari.paginate_array(Idea.where(id: @liked_idea_ids).eager_load(:idea_tags).preload(:user)).page(
      params[:like].try(
        :[], :page
      )
    ).per(10)
    # 自分のアイデア以外でコメントしたアイデアを表示
    @commented_idea_list = @user.comment_ideas.preload(:user).others_ideas(@user)
    @commented_ideas = Kaminari.paginate_array(@commented_idea_list).page(params[:comment].try(:[], :page)).per(10)

    # チーム開発参加数を取得
    @joined_team_num = TeamUser.where(user_id: @user.id).size
  end

  def search
    @q = User.defined_user.ransack(params[:q])
    @q.sorts = 'point desc' if @q.sorts.empty? # 初期はコントリビュート数を降順に設定
    @searched_users = @q.result(distinct: true)
    @paged_users = Kaminari.paginate_array(@searched_users).page(params[:page])
    current_page = params[:page].nil? ? 1 : params[:page].to_i
    @rank_num = (current_page - 1) * @paged_users.limit_value
  end

  def commenter
    # 1週間以内にコメントを追加したユーザーのIDとコメント数をピックアップ
    user_array = Comment.weekly_comments.pickup_user_commets(t('default.users.weekly_comments_num'))
    user_list = user_array.map { |u| User.find(u[0]) }
    render partial: 'users/user_list', locals: { users: user_list, user_array:, icon: '💬' }
  end

  def idea_man
    # 1ヶ月以内にアイデアを公開したユーザーのIDとアイデア数をピックアップ
    user_array = Idea.published.recent_select.pickup_user_nums(t('default.users.monthly_publisher_num'))
    user_list = user_array.map { |u| User.find(u[0]) }
    render partial: 'users/user_list', locals: { users: user_list, user_array:, icon: '💬' }
  end

  private

  def page_user
    @user = User.find_by(id: params[:id])
    redirect_to root_path, alert: t('page_user.fail') if @user.nil?
    # TODO: page.userはいろんなところにまたがっているので、i18を使用するのであれば各ページでalertの文言を用意しなければならない
  end

  def own_user?
    @user == current_user
  end
end
