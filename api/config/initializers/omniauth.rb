Rails.application.config.middleware.use OmniAuth::Builder do

  provider :google_oauth2,
    Rails.application.credentials.dig(:google, :client_id),
    Rails.application.credentials.dig(:google, :client_secret),
    {
      scope: 'email,profile',
      redirect_uri: 'http://localhost:3010/auth/google_oauth2/callback'
    }
  # "#{ENV['HOST'] || 'http://localhost:3010'}/auth/google_oauth2/callback"
  # http://localhost:3010/auth/google_oauth2/callback
  # provider :twitter, Rails.application.credentials.dig(:twitter, :api_key), Rails.application.credentials.dig(:twitter, :api_secret), scope: 'email', redirect_uri: "#{ENV['HOST'] || 'http://localhost:3010'}/auth/twitter/callback"
  # , redirect_uri: "#{ENV['FRONTEND_URL'] || 'http://localhost:3000'}/user/twitter"

  provider :twitter,
    Rails.application.credentials.dig(:twitter, :api_key),
    Rails.application.credentials.dig(:twitter, :api_secret),
    callback_path: 'http://localhost:3010/auth/twitter/callback',
    scope: 'email'
    # {
    #   scope: 'email',
    #   redirect_url: 'http://localhost:3010/auth/twitter/callback'
    # }
    # {
    #   :secure_image_url => 'true',
    #   :image_size => 'original',
    #   :authorize_params => {
    #     :force_login => 'true',
    #     :lang => 'ja'
    #   },
    #   redirect_url: "#{ENV['HOST'] || 'http://localhost:3010'}/auth/twitter/callback"
    # }
end
