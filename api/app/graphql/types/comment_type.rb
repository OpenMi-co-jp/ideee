# frozen_string_literal: true

module Types
  class CommentType < Types::BaseObject
    field :id, ID, null: true, description: 'コメントID'
    field :description, String, null: false, description: '本文'
    field :user_id, Integer, null: true, description: 'ユーザーID'
    field :idea_id, Integer, null: true, description: 'アイデアID'
    field :created_at, GraphQL::Types::ISO8601DateTime, null: true, description: '作成日'
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: true, description: '更新日'
    field :user, Types::UserType, null: true, description: 'ユーザーオブジェクト'
    field :likes_count, Integer, null: false, description: 'コメントいいね数'

    def likes_count
      object.likes.size
    end
  end
end
