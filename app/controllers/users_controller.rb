class UsersController < ApplicationController
  before_action :authenticate_user!, except: %i[ index show search ]
  prepend_before_action :page_user, only: %i[ show ]
  before_action :defined_check, except: %i[ index ], if: :own_user?

  def index
    @users = Kaminari.paginate_array(User.where(defined: true).order(point: "DESC"))
                     .page(params[:page]).per(5)
  end

  def show
    @user.point_update
    @user.check_defined?
  end

  def search
    @searched_users = User.where(defined: true).search(params[:key]).order(point: "DESC").first(30)
  end

  private

  def page_user
    @user = User.find(params[:id])
  end

  def own_user?
    @user == current_user
  end
end
