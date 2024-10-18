# frozen_string_literal: true

module Resolvers
  class Message::MessagesResolver < BaseResolver
    graphql_name 'GetMessages'

    argument :team_id, ID, required: true, description: 'ルームID'

    type [Types::MessageType], null: false

    def resolve(team_id:)
      team = ::Team.find_by(id: team_id)
      return [] unless team

      team.room&.messages || []
    end
  end
end
