# frozen_string_literal: true

module Resolvers
  class Like::LikesByUserResolver < BaseResolver
    graphql_name 'GetLikesByUser'

    type [Types::LikeType], null: false

    argument :user_id, Integer, required: true, description: 'ユーザーID'

    def resolve(user_id:)
      ::Like.where(user_id:)
    end
  end
end
