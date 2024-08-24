module AIResponse
  def self.fetch_ai_response(content, heavy: false)
    client = OpenAI::Client.new
    model = heavy ? OPENAI_HEAVY_MODEL : OPENAI_MODEL
    response = client.chat(
      parameters: {
        model:,
        messages: [{ role: 'system', content: }],
        response_format: { type: 'json_object' },
        temperature: OPENAI_TEMPERATURE
      }
    )
    response.dig('choices', 0, 'message', 'content')
  rescue OpenAI::OpenAIException => e
    Sentry.capture_exception(e)
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
