# frozen_string_literal: true

class OmniauthCallbacksController < DeviseTokenAuth::OmniauthCallbacksController
  include Devise::Controllers::Rememberable

  def twitter
    Rails.logger.debug '==============twitter'
    callback_for(:twitter)
  end

  def google_oauth2
    Rails.logger.info '==============google_oauth2'
    Rails.logger.info param
    callback_for(:google)
  end

  def redirect_callbacks
    Rails.logger.debug '==============redirect_callbacks'
    super
  end

  def omniauth_success
    Rails.logger.debug '==============omniauth_success'
    Rails.logger.debug request.env['omniauth.auth']
    Rails.logger.debug request.inspect
    Rails.logger.debug params
    Rails.logger.debug params[:provider]
    Rails.logger.debug params[:uid]
    super
  end

  def omniauth_failure
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
      sign_in_and_redirect @user, event: :authentication
      cookies[:devise_provider] = provider
      # set_flash_message(:notice, :success, kind: provider.to_s.capitalize) if is_navigational_format?
    else
      # session["devise.#{provider}_data"] = request.env["omniauth.auth"].except("extra")
      if (data = request.env['omniauth.auth']['extra']['raw_info'])
        session['devise.omniauth_data'] = {
          email: data['email'],
          name: data['name']
        }
      end
      redirect_to new_user_registration_url
    end
  end

  # def failure
  #   redirect_to root_path
  # end
end
