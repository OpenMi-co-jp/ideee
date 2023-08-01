# frozen_string_literal: true

class OmniauthCallbacksController < Devise::OmniauthCallbacksController
  include Devise::Controllers::Rememberable

  def twitter
    Rails.logger.info '==========これだよね====twitter'
    Rails.logger.info params
    callback_for(:twitter)
  end

  def google_oauth2
    Rails.logger.info '=============これ=google_oauth2'
    Rails.logger.info params
    callback_for(:google)
  end

  def redirect_callbacks
    Rails.logger.debug '==============redirect_callbacks'
  end
    Rails.logger.debug '==============omniauth_success'
    Rails.logger.debug request.env['omniauth.auth']
    Rails.logger.debug request.inspect
    Rails.logger.debug params
    Rails.logger.debug params[:provider]
    Rails.logger.debug params[:uid]
=======
>>>>>>> 7a8600f3 (fix: rubocopの修正)
    super
  end

  def omniauth_failure
    Rails.logger.debug params
    Rails.logger.debug '==============omniauth_failure'
    super
  end

  def callback
    Rails.logger.debug '-============callback'
  end

  def failure
    Rails.logger.debug '------------------failure'
    Rails.logger.debug params
    super
  end

  private

  def callback_for(provider)
    Rails.logger.debug '-------------callback_for'
    begin
      @user = User.from_omniauth(request.env['omniauth.auth'])
      if Rails.env.production? && @user.created_at > Time.zone.now.ago(5.minutes)
        Slack::SendNewJob.perform_later(@user, user_url(@user.id))
      end
    rescue StandardError => e
      redirect_to new_user_session_path
      Rails.logger.debug e.message
      # return set_flash_message(:notice, :failure, kind: provider.to_s.capitalize, reason: e.message)
    end
    if @user.persisted?
      # sign_in_and_redirect @user, event: :authentication
      token = @user.generate_jwt_token
      redirect_to "http://localhost:3000/user/auth_callback?token=#{token}"
      cookies[:devise_provider] = provider
      # set_flash_message(:notice, :success, kind: provider.to_s.capitalize) if is_navigational_format?
    else
      puts '-==-========not persisted'
      # session["devise.#{provider}_data"] = request.env["omniauth.auth"].except("extra")
      if (data = request.env['omniauth.auth']['extra']['raw_info'])
        session['devise.omniauth_data'] = {
          email: data['email'],
          name: data['name']
        }
      end
      # redirect_to new_user_registration_url
      token = 'aaaa'
      redirect_to "http://localhost:3000/user/auth_callback?token=#{token}"
    end
  end

  # def failure
  #   redirect_to root_path
  # end
end
