class ApplicationController < ActionController::Base
  before_action :authenticate_user!
  before_action :configure_permitted_parameters, if: :devise_controller?

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
  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:name])
  end
end
