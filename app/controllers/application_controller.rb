class ApplicationController < ActionController::Base
  # before_action :basic_auth
  before_action :defined_check

  # devise settings
  def after_sign_in_path_for(resource)
    if current_user
      flash[:notice] = "ログインに成功しました。"
      user_path(id: current_user.id)
    else
      flash[:alert] = "新規登録完了しました。ユーザー情報を登録してください。"
      new_profile_path
    end
  end

  protected

  # def basic_auth
  #   return if session['basic.auth']
  #   authenticate_or_request_with_http_basic do |username, password|
  #     username == ENV["BASIC_AUTH_USER"] && password == ENV["BASIC_AUTH_PASSWORD"]
  #     session['basic.auth'] = true
  #   end
  # end

  def defined_check
    if current_user.undefined?
      redirect_to edit_user_registration_path(params[:id])
      flash[:alert] = "ユーザーの名前を登録してください。" if current_user.name.blank?
      flash[:alert] = "ユーザーのメールアドレスを確認が完了していません。" if current_user.confirmed_at.blank?
      flash[:alert] = "ユーザーのタイプを登録してください。" if current_user.definition.blank?
    end
  end
end
