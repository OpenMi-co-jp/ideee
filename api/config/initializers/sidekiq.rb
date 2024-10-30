# frozen_string_literal: true

require 'sidekiq/web'

Sidekiq::Web.use(Rack::Auth::Basic) do |user, password|
  [
    user,
    password
  ] == [
    Rails.application.credentials.dig(:sidekiq, :user),
    Rails.application.credentials.dig(:sidekiq, :password)
  ]
end

Sidekiq.configure_server do |config|
  config.redis = { url: "#{ENV.fetch('REDIS_URL', 'redis://localhost:6379')}/0", ssl_params: { verify_mode: OpenSSL::SSL::VERIFY_NONE } }
end

Sidekiq.configure_client do |config|
  config.redis = { url: "#{ENV.fetch('REDIS_URL', 'redis://localhost:6379')}/0", ssl_params: { verify_mode: OpenSSL::SSL::VERIFY_NONE } }
end
