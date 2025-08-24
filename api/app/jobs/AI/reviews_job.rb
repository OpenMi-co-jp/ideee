# frozen_string_literal: true

module AI
  class ReviewsJob < ApplicationJob
    queue_as :high

    def perform(id)
      idea = Idea.find(id)
      raise ArgumentError, 'レビューが既に存在しています' if idea.reviews.present?

      # AIにプロンプトを投げてレビューを取得
      prompt = build_review_prompt(idea)
      response = AiResponseService.fetch_ai_response(prompt)

      res = JSON.parse(response)
      # レスポンスからpositiveとnegativeのレビューを作成
      idea.reviews.create!(content: res['positive_review'], stance: 'positive')
      idea.reviews.create!(content: res['negative_review'], stance: 'negative')
      idea.update!(difficulty: res['difficulty'])
    rescue StandardError => e
      Sentry.capture_exception(e)
      raise e
    end

    private

    def build_review_prompt(idea)
      <<~PROMPT
        あなたはプロのITサービスのアクセレーターです。
        以下のITサービスのアイデアを確認して、レビューの文章と開発難易度レベルを作成してください。
        #{idea_select_prompt(idea)}
        レビュー内容は、天使役と悪魔役でそれぞれキャラの口調に合わせて作成して。
        天使役は特出して良いさらに延ばすべき点を教えて。悪魔役は悪い点を出すだけでなく、どうやったら改善できるかも教えて。
        開発難易度レベルは、easy、middle、hardのいずれかで答えて。
        { positive_review: '{天使のポジティブレビュー}', negative_review: '{悪魔のネガティブレビュー}', difficulty: '{開発難易度レベル}' }の型でそれぞれ具体的に150文字程度のJSON形式で返して。
      PROMPT
    end

    def idea_select_prompt(idea)
      prompt = ''
      prompt += "アイデア名: #{idea.name}\n"
      prompt += "背景: #{idea.background}\n"
      prompt += "ゴール: #{idea.goal}\n"
      prompt += "問題点: #{idea.issue}\n" if idea.issue.present?
      prompt += "欲しい機能: #{idea.wish_function}\n" if idea.wish_function.present?
      prompt += "ターゲット: #{idea.target}\n" if idea.target.present?
      prompt += "マネタイズ方法: #{idea.monetize}\n" if idea.monetize.present?
      prompt += "類似サービス: #{idea.similar}\n" if idea.similar.present?
      prompt
    end
  end
end
