# frozen_string_literal: true

module Resolvers
  class Team::TeamsResolver < BaseResolver
    graphql_name 'GetTeams'

    type [Types::TeamType], null: false

    def resolve
      ::Team.all
    end
  end
end
