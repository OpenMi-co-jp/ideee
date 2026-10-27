# frozen_string_literal: true

module Resolvers
  class Team::TeamsResolver < BaseResolver
    graphql_name 'GetTeams'

    # 全件返すと件数の増加に比例してレスポンスが重くなるため上限を設ける
    MAX_TEAMS = 100
    private_constant :MAX_TEAMS

    type [Types::TeamType], null: false

    def resolve
      ::Team.preload(:owner, :idea).order(created_at: :desc).limit(MAX_TEAMS)
    end
  end
end
