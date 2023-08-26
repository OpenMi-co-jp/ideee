# frozen_string_literal: true

module Types
  class RoomType < Types::BaseObject
    field :id, ID, null: false, description: 'ルームID'
    field :team_id, Integer, description: 'チームID'
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false, description: '作成日'
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false, description: '更新日'
  end
end
