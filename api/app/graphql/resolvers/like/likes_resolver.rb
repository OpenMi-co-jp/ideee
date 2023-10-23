# frozen_string_literal: true

module Resolvers
  class Like::LikesResolver < BaseResolver
    graphql_name 'GetLikes'

    type [Types::LikeType], null: false

    argument :user_id, ID, required: true, description: 'ユーザーID'

    def resolve(**args)
      ::Like.where(user_id: args[:user_id])
    end
  end
end
