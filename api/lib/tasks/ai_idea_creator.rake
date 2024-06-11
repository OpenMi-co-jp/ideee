# frozen_string_literal: true

require_relative '../openai/ai_response'
require 'net/http'
require 'json'

namespace :ai_idea_creator do
  desc 'AIによるアイデア作成'
  task create_idea: :environment do
    # botアカウントのID
    bot_user_id = ENV.fetch('BOT_USER_ID', 3375)
    idea = Idea.new(user_id: bot_user_id)
    res = AIResponse.fetch_ai_response(build_prompt)
    parsed_res = JSON.parse(res)
    idea_content = parsed_res['idea']
    tags = parsed_res['tags']
    assign_idea_attributes(idea, idea_content)
    idea.save!
    idea.save_with_tags!(tags)
    idea.publish!
  rescue StandardError => e
    Sentry.capture_exception(e)
    raise e
  end

  private

  def build_prompt
    news = news_contents.pluck('title').to_json
    existing_tags = Tag.pluck(:name).join(', ')
    <<~CONTENT
      ITサービスのアイデアを以下のニュースから作成してください。
      news: #{news}
      アイデアの構成要素: { idea: { name: '名前', background: '背景', goal: '目標', issue: '問題点', wish_function: '欲しい機能', target:'ターゲット', monetize: 'マネタイズ方法', similar: '類似サービス' }, tags: ['タグ1', 'タグ2', 'タグ3'] }
      必須項目: アイデア名、背景、ゴール、タグ
      既存のタグ: #{existing_tags}
      制限: アイデア名30文字以内、タグ12文字以内の3つまで、その他は255文字以内で具体的に nで改行、既存のタグも確認し近しいものがあれば利用。
      ポイント: アイデア名はわかりやすくキャッチー、その他の項目は具体的かつユーザーの目を惹けるような魅力的な文章で作成。
      JSON形式で、ideaとtagsのkeyを設定し、日本語で返してください。
    CONTENT
  end

  def news_contents
    api_key = Rails.application.credentials.dig(:gnews, :api_key)
    category = %w[world nation business technology entertainment sports science health].sample
    api_url = URI("https://gnews.io/api/v4/top-headlines?country=jp&category=#{category}&apikey=#{api_key}")

    http = Net::HTTP.new(api_url.host, api_url.port)
    http.use_ssl = true

    request = Net::HTTP::Get.new(api_url.request_uri)
    response = http.request(request)

    JSON.parse(response.body)['articles']
  end

  def assign_idea_attributes(idea, idea_content)
    idea.assign_attributes(
      name: idea_content['name'],
      background: idea_content['background'],
      goal: idea_content['goal'],
      issue: idea_content['issue'],
      wish_function: idea_content['wish_function'],
      target: idea_content['target'],
      monetize: idea_content['monetize'],
      similar: idea_content['similar']
    )
  end
end
