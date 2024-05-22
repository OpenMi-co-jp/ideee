# frozen_string_literal: true

namespace :ai_commit do
  desc 'AIによるタグ作成'
  task :set_tags, ['id'] => :environment do |_task, args|
    idea = Idea.find(args[:id])
    content = build_content(idea)
    response = fetch_openai_response(content)
    proposed_keys = parse_response(response)
    idea.save_with_tags!(proposed_keys)
  end

  private

  def existing_tags
    Rails.cache.fetch('existing_tags', expires_in: 1.hour) do
      Tag.all.pluck(:name)
    end
  end

  def build_content(idea)
    # コンテンツ生成の処理を別メソッドに移動
    <<~CONTENT
      これからITサービスのアイデアを提案するので、適当でシンプルで一般的なキーワード3つを提案してください。
      アイデア名: #{idea.name}, アイデアの背景: #{idea.background}, アイデアの目的: #{idea.goal}, その他: #{idea.note}
      既存のタグ: #{existing_tags}
      提案されたキーワードはSEO対策のためにmetaタグのkeywordsに使用されます。
      JSON形式で{ keys: ['keys1', 'keys2', 'keys3'] }と返してください。
    CONTENT
  end

  def fetch_openai_response(content)
    # OpenAIへのリクエスト処理を別メソッドに移動
    client = OpenAI::Client.new
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

  def parse_response(response)
    # レスポンスの解析処理を別メソッドに移動
    res_json = JSON.parse(response)
    res_json['keys']
  end
end
