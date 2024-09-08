# frozen_string_literal: true

require 'active_support/core_ext/integer/time'

Rails.application.configure do
  # Settings specified here will take precedence over those in config/application.rb.

  # Code is not reloaded between requests.
  config.cache_classes = true

  config.cache_store = :memory_store, { size: 64.megabytes }

  # Eager load code on boot. This eager loads most of Rails and
  # your application in memory, allowing both threaded web servers
  # and those relying on copy on write to perform better.
  # Rake tasks automatically ignore this option for performance.
  config.eager_load = true

  # API モードなので valid_request_origin? が必ず false になるため
  config.action_controller.forgery_protection_origin_check = false

  # Full error reports are disabled and caching is turned on.
  config.consider_all_requests_local       = false
  config.action_controller.perform_caching = true

  # Disable serving static files from the `/public` folder by default since
  # Apache or NGINX already handles this.
  config.public_file_server.enabled = ENV['RAILS_SERVE_STATIC_FILES'].present?

  # Set js compressor Ver ES6
  config.assets.js_compressor = Uglifier.new(harmony: true)

  # Do not fallback to assets pipeline if a precompiled asset is missed.
  config.assets.compile = true

  config.assets.initialize_on_precompile = false

  # Store uploaded files on the local file system (see config/storage.yml for options).
  config.active_storage.service = :amazon

  # Force all access to the app over SSL, use Strict-Transport-Security, and use secure cookies.
  config.force_ssl = false

  # Include generic and useful information about system operation, but avoid logging too much
  # information to avoid inadvertent exposure of personally identifiable information (PII).
  config.log_level = :info

  # Prepend all log lines with the following tags.
  config.log_tags = [:request_id]

  config.action_mailer.perform_caching = false

  # Ignore bad email addresses and do not raise email delivery errors.
  # Set this to true and configure the email server for immediate delivery to raise delivery errors.
  config.action_mailer.raise_delivery_errors = true

  config.action_mailer.default_url_options = { host: ENV.fetch('HOST') }

  config.action_mailer.delivery_method = :smtp

  config.action_mailer.smtp_settings = {
    port: 587,
    address: 'smtp.sendgrid.net',
    domain: 'heroku.com',
    user_name: 'apikey',
    password: Rails.application.credentials.dig(:sendgrid, :api_key),
    authentication: 'plain',
    enable_starttls_auto: true
  }

  # Enable locale fallbacks for I18n (makes lookups for any locale fall back to
  # the I18n.default_locale when a translation cannot be found).
  config.i18n.fallbacks = true

  # Don't log any deprecations.
  config.active_support.report_deprecations = false

  # Use default logging formatter so that PID and timestamp are not suppressed.
  config.log_formatter = Logger::Formatter.new

  if ENV['RAILS_LOG_TO_STDOUT'].present?
    logger           = ActiveSupport::Logger.new($stdout)
    logger.formatter = config.log_formatter
    config.logger    = ActiveSupport::TaggedLogging.new(logger)
  end

  # Do not dump schema after migrations.
  config.active_record.dump_schema_after_migration = false

  config.frontend_url = ENV.fetch('FRONTEND_URL', nil)

  config.action_dispatch.cookies_same_site_protection = lambda do |request|
    :none if request.origin == 'https://ideee.tech'
  end

  config.middleware.insert_before Rack::Runtime, Rack::Timeout, service_timeout: 120
end
