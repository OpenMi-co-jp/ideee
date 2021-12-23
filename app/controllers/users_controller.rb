class UsersController < ApplicationController
  before_action :authenticate_user!, except: %i[ index show search ]
  prepend_before_action :page_user, only: %i[ show ]
  before_action :defined_check, except: %i[ index search ], if: :own_user?

  def index
    @users = Kaminari.paginate_array(User.defined_user.order(point: "DESC"))
                     .page(params[:page])
    current_page = params[:page].nil? ? 1 : params[:page].to_i
    @rank_num = (current_page - 1) * @users.limit_value
  end

  def show
    @user.point_update # Contributionの計算/更新
    @user.check_defined? # definedのチェック/更新
    @ideas = Kaminari.paginate_array(@user.ideas.published).page(params[:page])
  end

  def search
    if params[:sort] == "weekly_comments"
      comments = Comment.weekly_comments
      users_array = comments.pickup_user_commets(comments.length)
      list = users_array.map{|u| User.find(u[0])}
    else
      list = User.defined_user.search(params[:key]).order(point: "DESC")
    end
    @searched_users = Kaminari.paginate_array(list).page(params[:page])
  end

  private

  def page_user
    @user = User.find(params[:id])
  end

  def own_user?
    @user == current_user
  end
end
