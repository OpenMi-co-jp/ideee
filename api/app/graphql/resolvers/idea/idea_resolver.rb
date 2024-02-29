# frozen_string_literal: true

module Resolvers
  class Idea::IdeaResolver < BaseResolver
    graphql_name 'GetIdea'

    type Types::Idea::IdeaType, null: false

    argument :id, ID, required: true, description: 'アイデア検索ID'

    def resolve(**args)
      idea = ::Idea.find(args[:id])
      if idea.draft? && context[:current_user] != idea.user
        raise GraphQL::ExecutionError.new('権限がありません', options: { status: :unauthorized })
      end

      idea
    end
  end
end
