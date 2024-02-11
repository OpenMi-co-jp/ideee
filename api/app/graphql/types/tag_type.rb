# frozen_string_literal: true

module Types
  class TagType < Types::BaseObject
    field :id, ID, null: true, description: 'タグID'
    field :name, String, null: false, description: 'タグ名'
    field :created_at, GraphQL::Types::ISO8601DateTime, null: true, description: '作成日'
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: true, description: '更新日'
  end
end
