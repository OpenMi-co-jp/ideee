# frozen_string_literal: true

class Users::OmniauthCallbacksController < Devise::OmniauthCallbacksController
  def twitter
    callback_for(:twitter)
  end

  def google_oauth2
    callback_for(:google)
  end

  private

  def callback_for(provider)
    begin
      user = User.from_omniauth(request.env['omniauth.auth'])
      if Rails.env.production? && user.created_at > Time.zone.now.ago(5.minutes)
        Slack::SendNewJob.perform_later(user, user_url(user.id))
      end
    rescue StandardError => e
      Rails.logger.debug e.message
      render json: { action: 'ログイン', message: e.message }, status: :unauthorized
    end
    if user.persisted?
      sign_in user, event: :authentication
      cookies[:devise_provider] = provider
    else
      if (data = request.env['omniauth.auth']['extra']['raw_info'])
        session['devise.omniauth_data'] = {
          email: data['email'],
          name: data['name']
        }
      end
      render json: { action: 'ログイン', message: e.message }, status: :unauthorized
    end
  end
end
