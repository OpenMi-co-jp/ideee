Sentry.init do |config|
  config.dsn = 'https://aa5f9ccba2cc454abbdc0f2d6dd0df48@o997147.ingest.sentry.io/5955564'
  config.breadcrumbs_logger = [:active_support_logger, :http_logger]
  config.enabled_environments = %w[production]
  config.environment = Rails.env

  # Set tracesSampleRate to 1.0 to capture 100%
  # of transactions for performance monitoring.
  # We recommend adjusting this value in production
  config.traces_sample_rate = 0.5
  # or
  config.traces_sampler = lambda do |context|
    true
  end
end
