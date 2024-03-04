# frozen_string_literal: true

module Resolvers
  class Idea::ActiveTeamIdeasResolver < BaseResolver
    graphql_name 'GetActiveTeamIdeas'

    type [Types::Idea::IdeaType], null: false

    def resolve
      ::Idea.published
            .team_active
            .preload(:idea_tags)
            .eager_load(:user)
            .sample(4)
    end
  end
end
