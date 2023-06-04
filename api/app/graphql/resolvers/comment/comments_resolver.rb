# frozen_string_literal: true

module Resolvers
  class Comment::CommentsResolver < BaseResolver
    graphql_name 'GetComments'

    type [Types::CommentType], null: false

    def resolve
      ::Comment.all
    end
  end
end
