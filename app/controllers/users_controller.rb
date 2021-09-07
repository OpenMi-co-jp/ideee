class UsersController < ApplicationController
  before_action :authenticate_user!
  prepend_before_action :page_user, only: %w[show]
  before_action :defined_check, only: %w[show]

  def show; end

  private

  def page_user
    @user = User.find(params[:id])
  end

  def defined_check
    unless @user.defined?
      redirect_to edit_user_registration_path(params[:id])
      flash[:alert] = "ユーザーの名前を登録してください。" if @user.name.blank?
      flash[:alert] = "ユーザーのメールアドレスを確認が完了していません。" if @user.confirmed_at.blank?
      flash[:alert] = "ユーザーのタイプを登録してください。" if @user.definition.blank?
    end
  end
end
