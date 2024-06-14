# frozen_string_literal: true

require Rails.root.join('lib/openai/ai_response')

module AI
  class ReviewsJob < ApplicationJob
    queue_as :default

    def perform(id)
      idea = Idea.find(id)
      return raise ArgumentError 'レビューが既に存在しています' if idea.reviews.present?

      # AIにプロンプトを投げてレビューを取得
      prompt = build_review_prompt(idea)
      response = AIResponse.fetch_ai_response(prompt)

      res = JSON.parse(response)
      # レスポンスからpositiveとnegativeのレビューを作成
      idea.reviews.create!(content: res['positive_review'], stance: 'positive')
      idea.reviews.create!(content: res['negative_review'], stance: 'negative')
    rescue StandardError => e
      Sentry.capture_exception(e)
      raise e
    end

    private

    def build_review_prompt(idea)
      <<~PROMPT
        あなたはプロのITサービスのアクセレーターです。
        以下のITサービスのアイデアを確認して、レビューの文章を作成してください。
        アイデア名: #{idea.name}
        背景: #{idea.background}
        ゴール: #{idea.goal}
        問題点: #{idea.issue}
        欲しい機能: #{idea.wish_function}
        ターゲット: #{idea.target}
        マネタイズ方法: #{idea.monetize}
        類似サービス: #{idea.similar}
        レビュー内容は、天使役と悪魔役でそれぞれキャラの口調に合わせて作成して。
        天使役は特出して良いさらに延ばすべき点を教えて。悪魔役は悪い点を出すだけでなく、どうやったら改善できるかも教えて。
        { positive_review: '天使のポジティブレビュー' ,negative_review: '悪魔のネガティブレビュー' }の型でそれぞれ具体的に150文字程度のJSON形式で返して。
      PROMPT
    end
  end
end
