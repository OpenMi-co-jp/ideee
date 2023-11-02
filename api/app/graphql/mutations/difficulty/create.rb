module Mutations
  class Difficulty::Create < BaseMutation
    graphql_name 'CreateDifficulty'

    argument :idea_id, Integer, required: true, description: 'アイデアID'
    argument :user_id, Integer, required: true, description: 'ユーザーID'
    argument :level, String, required: true, description: '難易度レベル'

    field :difficulty, Types::DifficultyType, null: false, description: '難易度'
    field :success, Boolean, null: false, description: '成功フラグ'
    field :errors, [String], null: true, description: 'エラーメッセージのリスト'

    def resolve(**args)
      difficulty = ::Difficulty.new(
        idea_id: args[:idea_id],
        user_id: args[:user_id],
        level: args[:level]
      )
      difficulty.save!
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
