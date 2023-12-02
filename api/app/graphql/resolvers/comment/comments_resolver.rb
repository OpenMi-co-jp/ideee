# frozen_string_literal: true

module Resolvers
  class Comment::CommentsResolver < BaseResolver
    graphql_name 'GetComments'

    argument :idea_id, ID, required: true, description: 'アイデアID'

    type [Types::CommentType], null: false

    def resolve(idea_id:)
      ::Comment.eager_load(:user).where(idea_id:)
    end
  end
end
