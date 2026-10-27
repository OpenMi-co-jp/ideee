# frozen_string_literal: true

module Resolvers
  class Room::RoomResolver < BaseResolver
    graphql_name 'GetRoom'
    login_required

    type Types::RoomType, null: false

    argument :id, ID, required: true, description: 'ルーム検索ID'

    def resolve(**args)
      room = ::Room.find_by(id: args[:id])
      # チームメンバー以外にルームの存在を知らせない
      raise GraphQL::ExecutionError, 'ルームが見つかりません' if room.nil? || !room.team&.joined?(context[:current_user])

      room
    end
  end
end
