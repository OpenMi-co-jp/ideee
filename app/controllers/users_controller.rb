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
    published_list = @user.ideas.published.includes([:idea_tags]).order(published_at: 'DESC')
    @published_ideas = Kaminari.paginate_array(published_list).page(params[:published_page]).per(10)
    @like_ideas = Kaminari.paginate_array(Idea.where(id: @user.likes.type_idea_ids).includes([:idea_tags])).page(params[:like_page]).per(10)
    # 自分のアイデア以外でコメントしたアイデアを表示
    comment_idea_list = @user.comment_ideas.commented_others_ideas(@user)
    @commented_ideas = Kaminari.paginate_array(comment_idea_list).page(params[:comment_page]).per(10)
  end

  def search
    if params[:sort] == 'weekly_comments'
      comments = Comment.weekly_comments
      users_array = comments.pickup_user_commets(comments.length)
      list = users_array.map { |u| User.find_by!(id: u[0]) }
    elsif params[:sort] == 'monthly_published'
      ideas = Idea.published.recent_select
      users_array = ideas.pickup_user_nums(ideas.length)
      list = users_array.map { |u| User.find_by!(id: u[0]) }
    else
      list = User.defined_user.search(params[:key]).order(point: 'DESC')
    end
    @searched_users = Kaminari.paginate_array(list).page(params[:page])
  end

  def commenter
    # 1週間以内にコメントを追加したユーザーのIDとコメント数をピックアップ
    user_array = Comment.weekly_comments.pickup_user_commets(t('default.users.weekly_comments_num'))
    user_list = user_array.map { |u| User.find_by!(id: u[0]) }
    render partial: 'users/user_list', locals: { users: user_list, user_array: user_array, icon: '💬' }
  end

  def idea_man
    # 1ヶ月以内にアイデアを公開したユーザーのIDとアイデア数をピックアップ
    user_array = Idea.published.recent_select.pickup_user_nums(t('default.users.monthly_publisher_num'))
    user_list = user_array.map { |u| User.find_by!(id: u[0]) }
    render partial: 'users/user_list', locals: { users: user_list, user_array: user_array, icon: '💬' }
  end

  private

  def page_user
    @user = User.find_by!(id: params[:id])
  end

  def own_user?
    @user == current_user
  end
end
