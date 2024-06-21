module Mutations
  class Idea::AiReview < BaseMutation
    graphql_name 'IdeaAiReview'

    argument :idea_id, ID, required: true, description: 'アイデアID'

    field :job_id, String, null: true, description: 'ジョブID'
    field :success, Boolean, null: false, description: '成功フラグ'
    field :errors, [String], null: true, description: 'エラーリスト'

    def resolve(**args)
      idea = ::Idea.find(args[:idea_id])
      return { success: false, errors: ['アイデアが見つかりません'] } if idea.nil?
      return { success: false, errors: ['アイデアが公開されていません'] } if idea.draft

      todays_logs_count = idea.user.todays_ai_log_count
      return { success: false, errors: ['本日のAI利用制限を超えています'] } if todays_logs_count >= 3

      job_id = nil
      ActiveRecord::Base.transaction do
        create_ai_log(context[:current_user], 'review')
        todays_logs_count += 1

        job_id = AI::ReviewsJob.perform_later(args[:idea_id]).job_id
      end
      {
        job_id:,
        success: true,
        errors: ["本日の残りAI利用回数：#{3 - todays_logs_count} 回"]
      }
    rescue StandardError => e
      {
        success: false,
        errors: [e.message]
      }
    end

    def create_ai_log(user, action)
      ::AiLog.create!(user:, action:)
    end
  end
end
