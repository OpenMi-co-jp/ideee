# frozen_string_literal: true

module Resolvers
  class Idea::IdeaCountResolver < BaseResolver
    graphql_name 'GetIdeaCount'

    type Integer, null: false

    def resolve
      Rails.cache.fetch('idea_count', expires_in: 1.day) do
        ::Idea.count
      end
    end
  end
end
