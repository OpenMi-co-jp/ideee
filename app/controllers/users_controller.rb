class UsersController < ApplicationController
  before_action :authenticate_user!
  prepend_before_action :page_user, only: %i[ show ]
  skip_before_action :defined_check, only: %i[ index show edit ]

  def index
    @users = User.all
  end

  def show; end

  private

  def page_user
    @user = User.find(params[:id])
  end
end
