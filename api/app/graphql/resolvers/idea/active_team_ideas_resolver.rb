# frozen_string_literal: true

module Resolvers
  class Idea::ActiveTeamIdeasResolver < BaseResolver
    graphql_name 'GetActiveTeamIdeas'

    type [Types::Idea::IdeaType], null: false

    def resolve
      ::Idea.published.team_active.includes(:user, :idea_tags).sample(4)
    end
  end
end
