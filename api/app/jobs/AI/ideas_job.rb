# frozen_string_literal: true

require Rails.root.join('lib/openai/ai_response')
require 'net/http'

module AI
  class IdeasJob < ApplicationJob
    queue_as :high

    def perform
      res = AIResponse.fetch_ai_response(build_prompt)
      JSON.parse(res)
    rescue StandardError => e
      Sentry.capture_exception(e)
      raise e
    end

    private

    def build_prompt
      news = news_contents.pluck('title').to_json
      existing_tags = ::Tag.pluck(:name).join(', ')
      <<~CONTENT
        ITサービスのアイデアを以下のニュースから作成してください。
        news: #{news}
        アイデアの構成要素: { ideas: [{ name: '名前', ideaTags: ['タグ1', 'タグ2', 'タグ3'], background: '背景', goal: '目標' }] }
        必須項目: アイデア名、タグ、背景、ゴール
        既存のタグ: #{existing_tags}
        制限: アイデア名30文字以内、タグ12文字以内の3つまで、その他は255文字以内で具体的に nで改行、既存のタグも確認し近しいものがあれば利用。
        ポイント: アイデア名はわかりやすくキャッチー、その他の項目は具体的かつユーザーの目を惹けるような魅力的な文章で作成。ユニークで実現可能なアイデアを15個作成してください。
        JSON形式で、ideasのkeyを設定し、日本語で返してください。
      CONTENT
    end

    def news_contents
      api_key = Rails.application.credentials.dig(:gnews, :api_key)
      api_url = URI("https://gnews.io/api/v4/top-headlines?country=jp&max=10&apikey=#{api_key}")

      http = Net::HTTP.new(api_url.host, api_url.port)
      http.use_ssl = true

      request = Net::HTTP::Get.new(api_url.request_uri)
      response = http.request(request)

      JSON.parse(response.body)['articles']
    end
  end
end
