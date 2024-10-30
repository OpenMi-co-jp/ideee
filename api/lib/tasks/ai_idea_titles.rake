# frozen_string_literal: true

require_relative '../openai/ai_response'
require 'net/http'
require 'json'

namespace :ai_idea_titles do
  desc 'AIによるアイデアタイトル作成'
  task create_idea_titles: :environment do
    res = AIResponse.fetch_ai_response(build_titles)
    parsed_res = JSON.parse(res)
    Rails.cache.write('daily_idea_titles', parsed_res, expires_in: 24.hours)
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
    category = %w[world nation business technology entertainment sports science health].sample
    api_url = URI("https://gnews.io/api/v4/top-headlines?country=jp&max=15&category=#{category}&apikey=#{api_key}")

    http = Net::HTTP.new(api_url.host, api_url.port)
    http.use_ssl = true

    request = Net::HTTP::Get.new(api_url.request_uri)
    response = http.request(request)

    JSON.parse(response.body)['articles']
  end
end
