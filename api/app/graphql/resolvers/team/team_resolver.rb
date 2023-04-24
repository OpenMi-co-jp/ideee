# frozen_string_literal: true

module Resolvers
  class Team::TeamResolver < BaseResolver
    graphql_name 'GetTeam'

    type Types::TeamType, null: false

    argument :id, ID, required: true, description: 'チーム検索ID'

    def resolve(**args)
      ::Team.find(args[:id])
    end
  end
end
