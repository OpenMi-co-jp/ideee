# frozen_string_literal: true

require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Ideee
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 7.0

    # Configuration for the application, engines, and railties goes here.
    #
    # These settings can be overridden in specific environments using the files
    # in config/environments, which are processed later.
    #
    config.time_zone = 'Tokyo'
    config.active_record.default_timezone = :local

    # config.eager_load_paths << Rails.root.join("extras")
    config.i18n.default_locale = :ja
    config.i18n.load_path += Dir[Rails.root.join('config', 'locales', '**', '*.{rb,yml}').to_s]

    config.active_job.queue_adapter = :sidekiq

    config.action_view.field_error_proc = proc { |html_tag, _instance| html_tag }

    # rails7以降はデフォルトをvips指定とsるのでmini_magickを指定する
    config.active_storage.variant_processor = :mini_magick

    config.api_only = true

    # OmniAuthのエラーに対処
    config.session_store :cookie_store, key: '_interslice_session'
    # Required for all session management
    config.middleware.use ActionDispatch::Cookies
    config.middleware.use ActionDispatch::Session::CookieStore, config.session_options
    # TODO: materializeなどを削除してFlashの使用がなくなったら削除
    config.middleware.use ActionDispatch::Flash
  end
end
