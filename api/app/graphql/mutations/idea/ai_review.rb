module Mutations
  class Idea::AiReview < BaseMutation
    graphql_name 'IdeaAiReview'

    argument :idea_id, ID, required: true, description: 'アイデアID'

    field :job_id, String, null: true, description: 'ジョブID'
    field :success, Boolean, null: false, description: '成功フラグ'
    field :errors, [String], null: true, description: 'エラーリスト'

    def resolve(**args)
      job = AI::ReviewsJob.perform_later(args[:idea_id])
      {
        job_id: job.job_id,
        success: true
      }
    rescue StandardError => e
      {
        success: false,
        errors: [e.message]
      }
    end
  end
end
