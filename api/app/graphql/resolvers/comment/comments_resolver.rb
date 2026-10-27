# frozen_string_literal: true

module Resolvers
  class Comment::CommentsResolver < BaseResolver
    graphql_name 'GetComments'

    argument :idea_id, ID, required: true, description: 'アイデアID'

    type [Types::CommentType], null: false

    def resolve(idea_id:)
      idea = ::Idea.find_by(id: idea_id)
      # 下書きアイデアは本人しか閲覧できないため、コメントも同じ条件に揃える
      return [] if idea.nil? || (idea.draft? && context[:current_user]&.id != idea.user_id)

      ::Comment.eager_load(:user).where(idea_id: idea.id)
    end
  end
end
