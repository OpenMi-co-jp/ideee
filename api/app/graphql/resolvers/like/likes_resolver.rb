# frozen_string_literal: true

module Resolvers
  class Like::LikesResolver < BaseResolver
    graphql_name 'GetLikes'

    type [Types::LikeType], null: false

    def resolve
      ::Like.where(user_id: context[:current_user].id)
    end
  end
end