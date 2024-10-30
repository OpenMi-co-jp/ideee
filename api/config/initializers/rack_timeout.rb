# config/initializers/rack_timeout.rb

Rails.application.config.middleware.insert_before Rack::Runtime, Rack::Timeout, service_timeout: 60
