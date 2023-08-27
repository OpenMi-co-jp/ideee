# frozen_string_literal: true

module Resolvers
  class Like::LikesByUserResolver < BaseResolver
    graphql_name 'LikesByUserResolver'

    type [Types::LikeType], null: false

    argument :user_id, Integer, required: true, description: 'ユーザーID'

    def resolve(**args)
      ::Like.where(user_id: args[:user_id])
    end
  end
end
