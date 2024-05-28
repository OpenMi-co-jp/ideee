# frozen_string_literal: true

require_relative '../../openai/ai_response'

namespace :ai_commit do
  desc 'AIによるタグ作成'
  task set_tags: :environment do
    batch_size = 10
    ideas = Idea.includes(:idea_tags).where(idea_tags: { id: nil })
    ideas.each_slice(batch_size) do |idea_batch|
      content_batch = idea_batch.map { |idea| build_content(idea) }
      response_batch = AIResponse.fetch_openai_responses(content_batch)
      idea_batch.zip(response_batch).each do |idea, response|
        proposed_keys = AIResponse.parse_response(response)
        idea.save_with_tags!(proposed_keys)
      end
    rescue StandardError => e
      Sentry.capture_exception(e)
      raise e
    end
  end

  desc 'AIによるgoal,background更新'
  task update_nil_content: :environment do
    batch_size = 10
    ideas = Idea.where(goal: '_', background: '_').filter_map { |idea| idea if idea.note.present? }
    ideas.each_slice(batch_size) do |idea_batch|
      Rails.logger.info idea_batch.pluck(:id, :name)
      content_batch = idea_batch.map { |idea| build_nil_content(idea) }
      response_batch = AIResponse.fetch_openai_responses(content_batch)
      idea_batch.zip(response_batch).each do |idea, response|
        proposed_keys = JSON.parse(response)
        idea.update!(
          goal: proposed_keys['goal'],
          background: proposed_keys['background'],
          wish_function: proposed_keys['wish_function'],
          target: proposed_keys['target'],
          monetize: proposed_keys['monetize'],
          similar: proposed_keys['similar']
        )
        idea.update!(note: proposed_keys['note']) if proposed_keys['note'].present?
      end
    rescue StandardError => e
      Sentry.capture_exception(e)
    end
  end

  private

  def build_content(idea)
    <<~CONTENT
      これからITサービスのアイデアを提案するので、適当でシンプルで一般的なキーワード3つを提案してください。
      アイデア名: #{idea.name}, アイデアの背景: #{idea.background}, アイデアの目的: #{idea.goal}, その他: #{idea.note}
      既存のタグも確認して、近しいものがあれば利用してください。
      既存のタグ: #{existing_tags}
      提案されたキーワードはSEO対策のためにmetaタグのkeywordsに使用されます。
      JSON形式で{ keys: ['keys1', 'keys2', 'keys3'] }と返してください。
    CONTENT
  end

  def existing_tags
    Rails.cache.fetch('existing_tags', expires_in: 1.hour) do
      Tag.all.pluck(:name)
    end
  end

  def build_nil_content(idea)
    <<~CONTENT
      これからITサービスのアイデアを提案するので、続くnoteを使って、背景とゴールをそれぞれ抽出してください。
      アイデア名: #{idea.name}, note: #{idea.note}
      noteに補足の項目がある場合は、その項目をnoteとしてJsonで返してください。
      JSON形式で返してください。
      { goal: 'goal content', background: 'background content', note: 'note content', wish_function: 'メイン機能', target: 'ターゲット', monetize: '収益化', similar: '類似サービス' }
      また、補足の項目がないときはnoteをnoteをJsonに入れずに返してください。
      他にもメイン機能、ターゲット（ペルソナ）、収益化方法、類似サービスなどが抽出できるか、もしくは内容を確認して追記できるのであれば、それぞれgoalとbackground以外も追加して。
    CONTENT
  end
end
