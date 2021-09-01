class ApplicationController < ActionController::Base
  # before_action :basic_auth

  # devise settings
  def after_sign_in_path_for(resource)
    if current_user
      flash[:alert] = "ログインに成功しました。ユーザー情報を登録してください。"
      edit_user_registration_path(id: current_user.id)
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

end
