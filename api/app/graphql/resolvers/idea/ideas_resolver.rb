# frozen_string_literal: true

module Resolvers
  class Idea::IdeasResolver < BaseResolver
    graphql_name 'GetIdeas'

    type [Types::IdeaType], null: false

    def resolve
      ::Idea.all
    end
  end
end
