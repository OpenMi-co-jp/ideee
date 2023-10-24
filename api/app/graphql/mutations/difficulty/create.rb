module Mutations
  class Difficulty::Create < BaseMutation
    graphql_name 'CreateDifficulty'

    argument :idea_id, Integer, required: true, description: 'アイデアID'
    argument :user_id, Integer, required: true, description: 'ユーザーID'
    argument :level, Integer, required: true, description: '難易度レベル'

    field :difficulty, Types::DifficultyType, null: false, description: '難易度'
    field :success, Boolean, null: false, description: '成功フラグ'

    def resolve(**args)
      difficulty = ::Difficulty.new(
        idea_id: args[:idea_id],
        user_id: args[:user_id],
        level: args[:level]
      )
      difficulty.save!
      {
        difficulty: difficulty,
        success: true
      }
    end
  end
end
