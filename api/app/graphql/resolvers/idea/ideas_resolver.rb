# frozen_string_literal: true

module Resolvers
  class IdeasResolver < BaseResolver
    graphql_name 'GetIdeas'

    type [Types::Idea::IdeaType], null: false, description: 'アイデア一覧'

    def resolve
      {
        nodes: ::Idea.all
      }
    end
  end
end
