# frozen_string_literal: true

module Types
  class ReviewType < Types::BaseObject
    field :id, ID, null: false, description: 'レビューID'
    field :idea_id, Integer, null: false, description: 'アイデアID'
    field :content, String, null: false, description: 'レビュー内容'
    field :stance, String, description: 'レビュータイプ'
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false, description: '作成日'
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false, description: '更新日'
  end
end
