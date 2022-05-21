class Users::SessionsController < Devise::SessionsController
  after_action :set_login_cookie, only: %i[create]

  def new
    session.delete('devise.omniauth_data')
    set_minimum_password_length
    super
  end

  private

  def set_login_cookie
    # メールのログインのみsession newを使用
    cookies[:devise_provider] = 'mail'
  end
end
