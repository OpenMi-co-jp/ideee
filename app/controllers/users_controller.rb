class UsersController < ApplicationController
  before_action :authenticate_user!
  prepend_before_action :page_user, only: %i[ show ]
  before_action :defined_check, except: %i[ index ], if: :own_user?

  def index
    @users = User.all.order(point: "DESC").first(30)
  end

  def show
    @user.point_update
  end

  def search
    @searched_users = User.search(params[:key]).order(point: "DESC").first(30)
  end

  private

  def page_user
    @user = User.find(params[:id])
  end

  def own_user?
    @user == current_user
  end
end
