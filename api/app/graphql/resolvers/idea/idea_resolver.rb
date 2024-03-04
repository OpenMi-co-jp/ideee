# frozen_string_literal: true

module Resolvers
  class Idea::IdeaResolver < BaseResolver
    graphql_name 'GetIdea'

    type Types::Idea::IdeaType, null: false

    argument :id, ID, required: true, description: 'アイデア検索ID'

    def resolve(**args)
      idea = ::Idea.find(args[:id])
      if idea.draft? && context[:current_user]&.id != idea.user.id)
        raise GraphQL::ExecutionError, '権限がありません'
      end

      idea
    end
  end
end
