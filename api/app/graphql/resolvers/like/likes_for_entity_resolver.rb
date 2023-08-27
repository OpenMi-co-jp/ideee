# frozen_string_literal: true

module Resolvers
  class Like::LikesForEntityResolver < BaseResolver
    graphql_name 'GetLikesForEntity'

    type [Types::LikeType], null: false

    argument :likable_type, String, required: true, description: 'いいねをされたエンティティのタイプ（例: "記事", "コメント"）'
    argument :likable_id, Integer, required: true, description: 'いいねをされたエンティティのID'

    def resolve(**args)
      ::Like.where(args[:likable_type], args[:likable_id])
    end
  end
end
