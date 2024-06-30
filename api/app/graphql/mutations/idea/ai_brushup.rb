module Mutations
  class Idea::AiBrushup < BaseMutation
    graphql_name 'IdeaAiBrushUp'

    argument :idea_id, ID, required: false, description: 'アイデアID'
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
    field :idea_id, ID, null: true, description: 'アイデアID'

    def resolve(**args)
      idea = args[:idea_id] ? ::Idea.find_by(id: args[:idea_id]) : ::Idea.new(user: context[:current_user])

      if idea.persisted?
        return { success: false, errors: ['アイデアが公開されていません'] } if idea.draft
        return { success: false, errors: ['アイデアが既にブラッシュアップされています'] } if brushup_exists?(idea)
      else
        idea.assign_attributes(
          name: args[:name],
          background: args[:background],
          goal: args[:goal],
          issue: args[:issue],
          wish_function: args[:wish_function],
          hypothesis: args[:hypothesis],
          target: args[:target],
          monetize: args[:monetize],
          similar: args[:similar]
        )
      end

      todays_logs_count = context[:current_user].todays_ai_log_count
      return { success: false, errors: ['本日のAI利用制限を超えています'] } if todays_logs_count >= 3

      job_id = nil
      idea_id = nil
      ActiveRecord::Base.transaction do
        idea.save! if idea.new_record?
        idea_id = idea.id
        todays_logs_count += 1

        job_id = AI::BrushupJob.perform_later(
          idea_id,
          args[:name],
          args[:background],
          args[:goal],
          args[:issue],
          args[:wish_function],
          args[:hypothesis],
          args[:target],
          args[:monetize],
          args[:similar],
          context[:current_user].id
        ).job_id
      end

      {
        job_id:,
        success: true,
        errors: ["本日の残りAI利用回数：#{3 - todays_logs_count} 回"],
        idea_id:
      }
    rescue StandardError => e
      {
        success: false,
        errors: [e.message],
        idea_id: nil
      }
    end

    private

    def brushup_exists?(idea)
      AiLog.exists?(loggable: idea, action: 'brush_up')
    end
  end
end
