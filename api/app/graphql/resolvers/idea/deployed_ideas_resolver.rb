# frozen_string_literal: true

module Resolvers
  class Idea::DeployedIdeasResolver < BaseResolver
    graphql_name 'GetDeployedIdeas'

    type [Types::Idea::IdeaType], null: false

    def resolve
      ::Idea.published.includes(:user, :idea_tags).deployed.sample(4)
    end
  end
end
