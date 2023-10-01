# frozen_string_literal: true

module Resolvers
  class Idea::IdeaResolver < BaseResolver
    graphql_name 'GetIdea'

    type Types::Idea::IdeaType, null: false

    argument :id, ID, required: true, description: 'アイデア検索ID'

    def resolve(**args)
      ::Idea.find(args[:id])
    end
  end
end
