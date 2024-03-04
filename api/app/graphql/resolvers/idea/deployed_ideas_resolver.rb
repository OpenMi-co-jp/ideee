# frozen_string_literal: true

module Resolvers
  class Idea::DeployedIdeasResolver < BaseResolver
    graphql_name 'GetDeployedIdeas'

    type [Types::Idea::IdeaType], null: false

    def resolve
      ::Idea.published.eager_load(:user).preload(:idea_tags).deployed.sample(4)
    end
  end
end
