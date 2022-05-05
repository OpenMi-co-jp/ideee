class Users::SessionsController < Devise::SessionsController
  def new
    session.delete('devise.omniauth_data')
    set_minimum_password_length
    super
  end
end
