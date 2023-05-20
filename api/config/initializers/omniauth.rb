Rails.application.config.middleware.use OmniAuth::Builder do
  provider :google_oauth2, ENV.fetch('GOOGLE_KEY', nil), ENV.fetch('GOOGLE_SECRET', nil)
end
