# frozen_string_literal: true

class Users::OmniauthCallbacksController < Devise::OmniauthCallbacksController
  respond_to :json
  def twitter
    callback_for(:twitter)
  end

  def google_oauth2
    puts '------------------google but before'
    callback_for(:google)
  end

  def failure
    super
  end

  private

  def callback_for(provider)
    puts '=============callback_for before'
    begin
      user = User.from_omniauth(request.env['omniauth.auth'])
      if user.created_at > Time.zone.now.ago(5.minutes)
        user_url = "#{Rails.application.config.frontend_url}/users/#{user.id}"
        Slack::SendNewJob.perform_later(user, user_url)
      end
    rescue StandardError => e
      Rails.logger.debug e.message
      render json: { action: 'ログイン', message: e.message }, status: :unauthorized
    end
    if user.persisted?
      sign_in user, event: :authentication
      cookies[:devise_provider] = provider
      access_token = user.generate_jwt_token
      redirect_to Rails.application.config.frontend_url + "/user/auth_callback?token=#{access_token}"
    else
      if (data = request.env['omniauth.auth']['extra']['raw_info'])
        session['devise.omniauth_data'] = {
          email: data['email'],
          name: data['name']
        }
      end
      render json: { action: 'ログイン' }, status: :unauthorized
    end
  end
end
