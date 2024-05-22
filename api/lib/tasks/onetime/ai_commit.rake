# frozen_string_literal: true

namespace :ai_commit do
  desc 'AIによるタグ作成'
  task set_tags: :environment do
    batch_size = 10
    ideas = Idea.includes(:idea_tags).where(idea_tags: { id: nil }).where.not(background: '_')
    ideas.each_slice(batch_size) do |idea_batch|
      content_batch = idea_batch.map { |idea| build_content(idea) }
      response_batch = fetch_openai_responses(content_batch)
      idea_batch.zip(response_batch).each do |idea, response|
        proposed_keys = parse_response(response)
        idea.save_with_tags!(proposed_keys)
      end
    rescue StandardError => e
      Sentry.capture_exception(e)
      raise e
    end
  end

  private

  def existing_tags
    Rails.cache.fetch('existing_tags', expires_in: 1.hour) do
      Tag.all.pluck(:name)
    end
  end

  def build_content(idea)
    <<~CONTENT
      これからITサービスのアイデアを提案するので、適当でシンプルで一般的なキーワード3つを提案してください。
      アイデア名: #{idea.name}, アイデアの背景: #{idea.background}, アイデアの目的: #{idea.goal}, その他: #{idea.note}
      既存のタグ: #{existing_tags}
      提案されたキーワードはSEO対策のためにmetaタグのkeywordsに使用されます。
      JSON形式で{ keys: ['keys1', 'keys2', 'keys3'] }と返してください。
    CONTENT
  end

  def fetch_openai_responses(content_batch)
    client = OpenAI::Client.new
    content_batch.map do |content|
      response = client.chat(
        parameters: {
          model: ENV.fetch('OPENAI_MODEL', 'gpt-4-turbo'),
          messages: [{ role: 'system', content: }],
          response_format: { type: 'json_object' },
          temperature: ENV.fetch('OPENAI_TEMPERATURE', 0.3)
        }
      )
      response.dig('choices', 0, 'message', 'content')
    end
  end

  def parse_response(response)
    res_json = JSON.parse(response)
    res_json['keys']
  end
end
