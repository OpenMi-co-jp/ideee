# frozen_string_literal: true

module Resolvers
  class Comment::CommentResolver < BaseResolver
    graphql_name 'GetComment'

    type Types::CommentType, null: false

    argument :id, ID, required: true, description: 'コメント検索ID'

    def resolve(**args)
      ::Comment.find(args[:id])
    end
  end
end
