# frozen_string_literal: true

require Rails.root.join('lib/openai/ai_response')
require 'net/http'

module AI
  class IdeaTitlesJob < ApplicationJob
    queue_as :high

    def perform
      res = AIResponse.fetch_ai_response(build_titles)
      parsed_res = JSON.parse(res)
      # レスポンスの形の修正
      if parsed_res.is_a?(Hash) && parsed_res['ideas'].is_a?(Array)
        parsed_res['ideas']
      else
        parsed_res
      end
    rescue StandardError => e
      Sentry.capture_exception(e)
      raise e
    end

    private

    def build_titles
      titles = news_contents.pluck('title').to_json
      <<~CONTENT
        ニュースとカテゴリからITサービスのアイデアタイトルを15種類作成してください。
        #{titles}
        制限: アイデアタイトル9~15文字。
        JSON形式で、titleのkeyを設定し、日本語で返してください。
      CONTENT
    end

    def news_contents
      api_key = Rails.application.credentials.dig(:gnews, :api_key)
      api_url = URI("https://gnews.io/api/v4/top-headlines?country=jp&max=10&apikey=#{api_key}")

      http = Net::HTTP.new(api_url.host, api_url.port)
      http.use_ssl = true

      request = Net::HTTP::Get.new(api_url.request_uri)
      response = http.request(request)
      Rails.logger.info "Response body: #{response.inspect}"

      JSON.parse(response.body)['articles']
    end
  end
end
