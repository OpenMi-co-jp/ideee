Rails.application.config.middleware.use OmniAuth::Builder do
  provider :google_oauth2,
    Rails.application.credentials.dig(:google, :client_id),
    Rails.application.credentials.dig(:google, :client_secret),
    {
      redirect_uri: "#{ENV.fetch('HOST', 'http://localhost:3010')}/auth/google_oauth2/callback"
    }

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
