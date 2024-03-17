# frozen_string_literal: true

Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins ['http://localhost:3000', 'https://ideee.tech', /ideee-(.*)-narucel\.vercel\.app/]
    resource '*',
      headers: :any,
      expose: %w[access-token expiry token-type uid client authorization X-CSRF-Token],
      methods: %i[get post options delete put],
      credentials: true
  end
end
