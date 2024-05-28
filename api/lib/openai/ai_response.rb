module AIResponse
  def self.fetch_openai_responses(content_batch)
    client = OpenAI::Client.new
    content_batch.map do |content|
      response = client.chat(
        parameters: {
          model: OPENAI_MODEL,
          messages: [{ role: 'system', content: }],
          response_format: { type: 'json_object' },
          temperature: OPENAI_TEMPERATURE
        }
      )
      response.dig('choices', 0, 'message', 'content')
    end
  end

  def self.parse_response(response)
    res_json = JSON.parse(response)
    res_json['keys']
  end
end
