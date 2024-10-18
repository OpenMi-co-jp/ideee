# frozen_string_literal: true

module Types
  class MessageType < Types::BaseObject
    field :id, ID, null: false, description: 'メッセージID'
    field :user_id, Integer, null: false, description: 'ユーザーID'
    field :room_id, String, null: false, description: 'ルームID'
    field :content, String, description: 'メッセージ内容'
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false, description: '作成日'
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false, description: '更新日'

    field :user, Types::UserType, null: false, description: 'ユーザーオブジェクト'
  end
end
