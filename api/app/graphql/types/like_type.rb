# frozen_string_literal: true

module Types
  class LikeType < Types::BaseObject
    field :id, ID, null: false, description: 'コメントID'
    field :user_id, Integer, description: 'ユーザーID'
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false, description: '作成日'
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false, description: '更新日'
    field :likable_type, String, null: false, description: 'いいねをされたエンティティのタイプ（例: "記事", "コメント"）'
    field :likable_id, Integer, null: false, description: 'いいねをされたエンティティのID'
  end
end
