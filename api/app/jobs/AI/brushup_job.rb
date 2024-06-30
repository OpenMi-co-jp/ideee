# frozen_string_literal: true

require Rails.root.join('lib/openai/ai_response')

module AI
  class BrushupJob < ApplicationJob
    queue_as :default

    def perform(idea_id, name, background, goal, issue, wish_function, hypothesis, target, monetize, similar, user_id)
      @idea = Idea.find_or_initialize_by(id: idea_id)
      @name = name
      @background = background
      @goal = goal
      @issue = issue
      @wish_function = wish_function
      @hypothesis = hypothesis
      @target = target
      @monetize = monetize
      @similar = similar
      @user_id = user_id

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
      @idea.assign_attributes(
        name: @name,
        background: @background,
        goal: @goal,
        issue: res['issue'],
        wish_function: res['wish_function'],
        hypothesis: res['hypothesis'],
        target: res['target'],
        monetize: res['monetize'],
        similar: res['similar']
      )
      @idea.user = User.find_by(id: @user_id) if @idea.new_record?
      @idea.save!
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
        アイデア名: #{@name}
        背景: #{@background}
        ゴール: #{@goal}
      DETAILS

      details += "ユーザーの課題: #{@issue}\n" if @issue.present?
      details += "メイン機能: #{@wish_function}\n" if @wish_function.present?
      details += "数値的仮説: #{@hypothesis}\n" if @hypothesis.present?
      details += "ターゲット: #{@target}\n" if @target.present?
      details += "マネタイズ方法: #{@monetize}\n" if @monetize.present?
      details += "類似サービス: #{@similar}\n" if @similar.present?

      details
    end

    def create_ai_log(user, action, loggable_type, loggable_id)
      ::AiLog.create!(user:, action:, loggable_type:, loggable_id:)
    end
  end
end
