module Mutations
  class Difficulty::Create < BaseMutation
    graphql_name 'CreateDifficulty'

    argument :idea_id, Integer, required: true, description: 'アイデアID'
    argument :user_id, Integer, required: false, description: '（無視されます。投票者はログインユーザー）ユーザーID'
    argument :level, String, required: true, description: '難易度レベル'

    field :difficulty, Types::DifficultyType, null: true, description: '難易度'
    field :success, Boolean, null: false, description: '成功フラグ'
    field :errors, [String], null: true, description: 'エラーメッセージのリスト'

    def resolve(**args)
      idea = ::Idea.published.find_by(id: args[:idea_id])
      return { success: false, errors: ['アイデアが見つかりません'] } if idea.nil?

      difficulty = ::Difficulty.new(
        idea_id: idea.id,
        user_id: context[:current_user].id,
        level: args[:level]
      )
      if difficulty.save
        IdeaJob::UpdateDifficultyJob.perform_later(idea.id)
        Notifications::UpdateDifficultyJob.perform_later(context[:current_user], difficulty) unless context[:current_user].id == idea.user_id
      end
      {
        difficulty:,
        success: true
      }
    rescue ActiveRecord::RecordInvalid => e
      {
        success: false,
        errors: e.record.errors.full_messages
      }
    end
  end
end
