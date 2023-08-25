# frozen_string_literal: true

module Resolvers
  class Room::RoomResolver < BaseResolver
    graphql_name 'GetRoom'

    type Types::RoomType, null: false

    argument :id, ID, required: true, description: 'ルーム検索ID'

    def resolve(**args)
      ::Room.find(args[:id])
    end
  end
end
