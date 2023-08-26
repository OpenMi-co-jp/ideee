# frozen_string_literal: true

module Resolvers
  class Like::LikesResolver < BaseResolver
    graphql_name 'GetLikes'

    type [Types::LikeType], null: false

    def resolve
      ::Like.all
    end
  end
end
