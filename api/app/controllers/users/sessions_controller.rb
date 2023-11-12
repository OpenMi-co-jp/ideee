# frozen_string_literal: true

class Users::SessionsController < Devise::SessionsController
  before_action :underscore_params!, only: %i[create]
  after_action :set_login_cookie, only: %i[create]
  prepend_before_action :verify_signed_out_user, only: :destroy

  # POST /resource/sign_in
  def create
    user = User.find_for_database_authentication(email: params[:email])
    return invalid_email unless user

    if user.valid_password?(params[:password])
      sign_in :user, user
      response.set_header('Authorization', user.generate_jwt_token)
      render json: { action: 'ログイン' }, status: :ok
    else
      invalid_password
    end
  rescue StandardError => e
    render json: { action: 'ログイン', message: e.message }, status: :unauthorized
  end

  # DELETE /resource/sign_out
  def destroy
    sign_out(resource_name)
    render json: { action: 'ログアウト' }, status: :ok
  end

  protected

  def configure_sign_in_params
    devise_parameter_sanitizer.permit(:sign_in, keys: %i[email password remember_me])
  end

  private

  def underscore_params!
    params.deep_transform_keys!(&:underscore)
  end

  def sign_in_params
    params.require(:session).permit(:email, :password)
  end

  def respond_with(resource, _opts = {})
    render json: resource
  end

  def set_login_cookie
    # メールのログインのみsession newを使用
    cookies[:devise_provider] = 'mail'
  end

  def invalid_email
    warden.custom_failure!
    Rails.logger.debug 'ERROR: invalid_email'
    render json: {}, status: :unauthorized
  end

  def invalid_password
    warden.custom_failure!
    Rails.logger.debug 'ERROR: invalid_password'
    render json: {}, status: :unauthorized
  end

  def verify_signed_out_user
    return unless all_signed_out?

    render json: { action: 'ログアウト', message: '既にログアウト済みです。' }, status: :ok
  end
end
