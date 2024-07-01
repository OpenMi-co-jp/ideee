module Mutations
  class Idea::AiBrushup < BaseMutation
    graphql_name 'IdeaAiBrushUp'

    argument :idea_id, ID, required: true, description: 'アイデアID'
    argument :name, String, required: true, description: 'アイデア名'
    argument :background, String, required: true, description: 'アイデア背景'
    argument :goal, String, required: true, description: 'アイデアゴール'
    argument :issue, String, required: false, description: '課題・困っていること'
    argument :hypothesis, String, required: false, description: '仮説'
    argument :monetize, String, required: false, description: 'マネタイズ方法'
    argument :similar, String, required: false, description: '類似サービス'
    argument :target, String, required: false, description: 'ターゲット'
    argument :wish_function, String, required: false, description: '欲しい機能'

    field :job_id, String, null: true, description: 'ジョブID'
    field :success, Boolean, null: false, description: '成功フラグ'
    field :errors, [String], null: true, description: 'エラーリスト'

    def resolve(**args)
      idea = ::Idea.find_by(id: args[:idea_id])
      return { success: false, errors: ['アイデアが公開されていません'] } if idea.draft
      return { success: false, errors: ['アイデアが既にブラッシュアップされています'] } if brushup_exists?(idea)

      todays_logs_count = context[:current_user].todays_ai_log_count
      return { success: false, errors: ['本日のAI利用制限を超えています'] } if todays_logs_count >= 5

      job_id = nil
      ActiveRecord::Base.transaction do
        idea_id = idea.id
        todays_logs_count += 1

        job_id = AI::BrushupJob.perform_later(
          idea_id:,
          name: args[:name],
          background: args[:background],
          goal: args[:goal],
          issue: args[:issue],
          wish_function: args[:wish_function],
          hypothesis: args[:hypothesis],
          target: args[:target],
          monetize: args[:monetize],
          similar: args[:similar]
        ).job_id
      end

      {
        job_id:,
        success: true,
        errors: ["本日の残りAI利用回数：#{5 - todays_logs_count} 回"]
      }
    rescue StandardError => e
      {
        success: false,
        errors: [e.message]
      }
    end

    private

    def brushup_exists?(idea)
      AiLog.exists?(loggable: idea, action: 'brush_up')
    end
  end
end
