# frozen_string_literal: true

class QiitaPostJob < ApplicationJob
  queue_as :default

  def perform
    require 'httpclient'

    post_id = '0ef4b963434226eacb6b'
    title = "アイデア総数【#{Idea.all.length}】個人開発アイデアまとめ【毎日更新】"

    url = "https://qiita.com/api/v2/items/#{post_id}"
    header = {
      'Authorization' => "Bearer #{Rails.application.credentials.dig(:qiita, :access_token)}",
      'Content-Type' => 'application/json'
    }
    body = {
      body: make_body,
      title:
    }.to_json

    client = HTTPClient.new
    response = client.patch(url, header:, body:)
    SlackNotifier.new.send_error_report('Qiita自動投稿', response.http_header.reason_phrase) if response.code.to_i != 200
  rescue StandardError => e
    SlackNotifier.new.send_error_report('Qiita自動投稿', e)
  end

  private

  def make_body
    ideas = Idea.published.order(created_at: :desc)
    tags = Tag.joins(:ideas).merge(Idea.published).group(:id).order('COUNT(ideas.id) DESC')

    body = <<~CONTENT
      # #{Time.zone.now.strftime('%Y年%-m月%-d日')}時点でのアイデア総数：#{ideas.count}個

      ## 🔥 人気のアイデア（いいね順）
      #{popular_ideas_content(ideas)}

      ## 📊 人気のタグ
      #{popular_tags_content(tags)}

      ## 📝 最新のアイデア
      #{latest_ideas_content(ideas)}

      ---
      
      **このアイデア集について**
      - 毎日自動更新されています
      - 個人開発のアイデア出しにお役立てください
      - [アイデア投稿サイト](https://ideee.me/)で新しいアイデアも投稿できます
    CONTENT

    body
  end

  def popular_ideas_content(ideas)
    popular_ideas = ideas.order(likes_count: :desc).limit(5)
    popular_ideas.map.with_index(1) do |idea, index|
      "#{index}. [#{idea.name}](https://ideee.me/ideas/#{idea.id}) (#{idea.likes_count}いいね)"
    end.join("\n")
  end

  def popular_tags_content(tags)
    popular_tags = tags.limit(10)
    popular_tags.map do |tag|
      ideas_count = tag.ideas.published.count
      "- [#{tag.name}](https://ideee.me/search?tag=#{tag.name}) (#{ideas_count}個)"
    end.join("\n")
  end

  def latest_ideas_content(ideas)
    latest_ideas = ideas.limit(10)
    latest_ideas.map do |idea|
      "- [#{idea.name}](https://ideee.me/ideas/#{idea.id}) - #{idea.background&.truncate(50)}"
    end.join("\n")
  end
end