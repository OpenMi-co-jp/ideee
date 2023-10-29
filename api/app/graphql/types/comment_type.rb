# frozen_string_literal: true

module Types
  class CommentType < Types::BaseObject
    field :id, ID, null: false, description: 'コメントID'
    field :description, String, null: false, description: '本文'
    field :user_id, Integer, null: false, description: 'ユーザーID'
    field :idea_id, Integer, null: false, description: 'アイデアID'
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false, description: '作成日'
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false, description: '更新日'
    field :user, Types::UserType, null: false, description: 'ユーザーオブジェクト'
  end
end
