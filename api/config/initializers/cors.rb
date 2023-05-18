# frozen_string_literal: true

Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    # TODO: 本番へ移行時にドメイン設定を変更
    origins ['http://localhost:3000', 'https://ideee.vercel.app', /ideee-(.*)-narucel\.vercel\.app/]
    resource '*',
      headers: :any,
      expose: %w[access-token expiry token-type uid client authorization],
      methods: %i[get post options delete put]
  end
end
