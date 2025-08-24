# frozen_string_literal: true

require 'openai'

module AiResponseService
  def self.fetch_ai_response(content, heavy: false)
    client = OpenAI::Client.new
    model = heavy ? OPENAI_HEAVY_MODEL : OPENAI_MODEL

    parameters = {
      model:,
      messages: [{ role: 'system', content: }],
      temperature: OPENAI_TEMPERATURE
    }

    # gpt-4以上のモデルのみjson_objectをサポート
    if model.start_with?('gpt-4') && model.exclude?('mini')
      parameters[:response_format] = { type: 'json_object' }
    end

    response = client.chat(parameters:)
    response.dig('choices', 0, 'message', 'content')
  rescue OpenAI::Error, Faraday::TooManyRequestsError => e
    Sentry.capture_exception(
      e, extra: {
        error_type: e.class.name,
        error_message: e.message,
        api_status: e.respond_to?(:response) ? e.response&.status : nil
      }
    )
    raise e
  end

  def self.fetch_openai_responses(content_batch)
    content_batch.map do |content|
      fetch_ai_response(content)
    end
  end

  def self.parse_response(response)
    res_json = JSON.parse(response)
    res_json['keys']
  end
end