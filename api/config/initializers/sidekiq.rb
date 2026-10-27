# frozen_string_literal: true

require 'sidekiq/web'

# 管理画面はジョブの引数（メールアドレスなどの個人情報）が見え、再実行や削除もできるため、
# 認証情報が未設定の場合は誰も通さない（フェイルクローズ）。
# 比較は照合時間から正解文字数が推測されないよう固定時間で行う。
Sidekiq::Web.use(Rack::Auth::Basic) do |user, password|
  expected_user = Rails.application.credentials.dig(:sidekiq, :user).presence
  expected_password = Rails.application.credentials.dig(:sidekiq, :password).presence

  if expected_user.nil? || expected_password.nil?
    false
  else
    ActiveSupport::SecurityUtils.secure_compare(user.to_s, expected_user) &
      ActiveSupport::SecurityUtils.secure_compare(password.to_s, expected_password)
  end
end

Sidekiq.configure_server do |config|
  config.redis = { url: "#{ENV.fetch('REDIS_URL', 'redis://localhost:6379')}/0", ssl_params: { verify_mode: OpenSSL::SSL::VERIFY_NONE } }
end

Sidekiq.configure_client do |config|
  config.redis = { url: "#{ENV.fetch('REDIS_URL', 'redis://localhost:6379')}/0", ssl_params: { verify_mode: OpenSSL::SSL::VERIFY_NONE } }
end
