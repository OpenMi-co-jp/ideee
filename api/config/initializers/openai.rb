OPENAI_MODEL = ENV.fetch('OPENAI_MODEL', 'gpt-4-turbo')
OPENAI_TEMPERATURE = ENV.fetch('OPENAI_TEMPERATURE', 0.3).to_f
OpenAI.configure do |config|
  config.access_token = Rails.application.credentials.dig(:open_ai_api, :access_token)
  # config.organization_id = ENV.fetch("OPENAI_ORGANIZATION_ID") # Optional
  # Highly recommended in development, so you can see what errors OpenAI is returning. Not recommended in production.
  config.log_errors = true
end
