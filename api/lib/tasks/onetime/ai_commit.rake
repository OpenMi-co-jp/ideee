# frozen_string_literal: true

namespace :ai_commit do
  desc 'AIによるタグ作成'
  task :set_tags, ['id'] => :environment do |_task, args|
    idea = Idea.find(args[:id])

    Rails.logger.info '-----idea'
    Rails.logger.info idea.id
    Rails.logger.info idea.note
    content = "これからITサービスのアイデアを提案するので、適当でシンプルで一般的なキーワード３つを提案して。\
              アイデア名：#{idea.name}, アイデアの背景：#{idea.background}, アイデアの目的：#{idea.goal}, その他：#{idea.note}。\
              提案されたキーワードはSEO対策のためにmetaタグのkeywordsに使用されます。\
              JSON形式で以下のように{ keys: ['keys1', 'keys2', 'keys3'] }と返してください。"
    client = OpenAI::Client.new
    Rails.logger.info '-------content'
    Rails.logger.info content
    response = client.chat(
      parameters: {
        model: ENV.fetch('OPENAI_MODEL', 'gpt-4-turbo'),
          messages: [{ role: 'system', content: }],
          response_format: { type: 'json_object' },
          temperature: ENV.fetch('OPENAI_TEMPERATURE', 0.3)
      }
    )
    res = response.dig('choices', 0, 'message', 'content')
    Rails.logger.info '提案されたキーワード:'
    res_json = JSON.parse(res)
    keys = res_json['keys']
    Rails.logger.info keys
    idea.save_with_tags!(keys)
  end
end
