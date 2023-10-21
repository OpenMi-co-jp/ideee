module Resolvers
  class Difficulty::DifficultiesResolver < BaseResolver
    graphql_name 'GetDifficulties'
    type [Types::DifficultyType], null: false
    argument :user_id, ID, required: true, description: 'ユーザーID'
    def resolve(**args)
      ::Difficulty.where(user_id: args[:user_id])
    end
  end
end