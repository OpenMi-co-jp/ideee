class UsersController < ApplicationController
  before_action :authenticate_user!, except: %i[ index show search ]
  prepend_before_action :page_user, only: %i[ show ]
  before_action :defined_check, except: %i[ index search ], if: :own_user?

  def index
    @users = Kaminari.paginate_array(User.where(defined: true).order(point: "DESC"))
                     .page(params[:page])
    page_params = User.page(params[:page])
    current_page = params[:page].nil? ? 1 : params[:page].to_i
    @rank_num = (current_page - 1) * @users.limit_value
  end

  def show
    @user.point_update # Contributionの計算/更新
    @user.check_defined? # definedのチェック/更新
  end

  def search
    @searched_users = Kaminari.paginate_array(User.where(defined: true).search(params[:key]).order(point: "DESC"))
                              .page(params[:page])
  end

  private

  def page_user
    @user = User.find(params[:id])
  end

  def own_user?
    @user == current_user
  end
end
