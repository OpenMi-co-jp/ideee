class Users::OmniauthCallbacksController < Devise::OmniauthCallbacksController
  def twitter
    callback_for(:twitter)
  end

  def google_oauth2
    callback_for(:google)
  end

  def callback_for(provider)
  begin
    @user = User.from_omniauth(request.env["omniauth.auth"])
    if Rails.env.production? && @user.created_at > Time.now.ago(5.minute)
      SlackNotifier.new.send(@user, user_url(@user.id))
    end
  rescue => e
    redirect_to new_user_session_path
    return flash[:alert] = e.message
  end
    if @user.persisted?
      sign_in_and_redirect @user, event: :authentication
      set_flash_message(:notice, :success, kind: "#{provider}".capitalize) if is_navigational_format?
    else
      # session["devise.#{provider}_data"] = request.env["omniauth.auth"].except("extra")
      if (data = request.env['omniauth.auth']['extra']['raw_info'])
        session['devise.omniauth_data'] = {
            email: data['email'],
            name: data['name'],
        }
      end
      redirect_to new_user_registration_url
    end
  end

  def failure
    redirect_to root_path
  end
end
