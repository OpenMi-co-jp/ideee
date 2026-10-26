# frozen_string_literal: true

module AllowedOrigins
  ORIGINS = %w[http://localhost:3000 https://ideee.tech].freeze
  # Vercel のプレビュー（ideee-<hash>-narucel / ideee-git-<branch>-narucel）
  PREVIEW_ORIGIN = %r{\Ahttps://ideee-[a-z0-9-]+-narucel\.vercel\.app\z}

  # 第三者が同名パターンの Vercel プロジェクトを作れるため、本番では明示的に有効化したときだけ許可する
  PREVIEW_ALLOWED = !Rails.env.production? || Rails.application.config.allow_vercel_preview_origins

  public_constant :ORIGINS, :PREVIEW_ORIGIN, :PREVIEW_ALLOWED

  def self.allowed?(origin)
    return false if origin.blank?

    ORIGINS.include?(origin) || (PREVIEW_ALLOWED && PREVIEW_ORIGIN.match?(origin))
  end
end

Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins { |source, _env| AllowedOrigins.allowed?(source) }
    resource '*',
      headers: :any,
      expose: %w[access-token expiry token-type uid client authorization X-CSRF-Token],
      methods: %i[get post options delete put],
      credentials: true
  end
end
