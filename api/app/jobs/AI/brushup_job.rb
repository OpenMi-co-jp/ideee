# frozen_string_literal: true

require Rails.root.join('lib/openai/ai_response')

module AI
  class BrushupJob < ApplicationJob
    queue_as :default
    include AiLoggable

    def perform(id)
      @idea = Idea.find_by(id:)

      prompt = build_prompt
      response = AIResponse.fetch_ai_response(prompt)

      res = JSON.parse(response)

      update_idea_from_ai_response(res)
    rescue StandardError => e
      Sentry.capture_exception(e)
      raise e
    end

    private

    def update_idea_from_ai_response(res)
      @idea.update!(
        issue: res['issue'],
        wish_function: res['wish_function'],
        hypothesis: res['hypothesis'],
        target: res['target'],
        monetize: res['monetize'],
        similar: res['similar']
      )
      create_ai_log(@idea.user, 'brush_up', 'Idea', @idea.id)
    end

    def build_prompt
      <<~PROMPT
        あなたはプロのITサービスのアクセレーターです。
        以下のITサービスのアイデア名、背景、ゴールを確認して、問題点、欲しい機能、数値的仮説、ターゲット、マネタイズ方法、類似サービスを作成してください。
        #{idea_prompt_details}
        作成内容は、アイデア名、背景、ゴールを元に作成して。
        既に入力されている項目がある場合は、その内容を尊重しつつ、さらに改善や詳細化をしてください。
        { issue:, wish_function:, hypothesis:, target:, monetize:, similar: }の型でそれぞれ具体的に50文字程度のJSON形式で返して。
      PROMPT
    end

    def idea_prompt_details
      details = <<~DETAILS
        アイデア名: #{@idea[:name]}
        背景: #{@idea[:background]}
        ゴール: #{@idea[:goal]}
      DETAILS

      %i[issue wish_function hypothesis target monetize similar].each do |attr|
        details += "#{attr_label(attr)}: #{@idea[attr]}\n" if @idea[attr].present?
      end

      details
    end

    def attr_label(attr)
      {
        issue: 'ユーザーの課題',
        wish_function: 'メイン機能',
        hypothesis: '数値的仮説',
        target: 'ターゲット',
        monetize: 'マネタイズ方法',
        similar: '類似サービス'
      }[attr]
    end
  end
end
