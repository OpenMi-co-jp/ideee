# frozen_string_literal: true

module Types
  class DifficultyType < Types::BaseObject
    field :id, ID, null: false, description: 'ID'
    field :user_id, Integer, null: false, description: 'ユーザーID'
    field :idea_id, Integer, null: false, description: 'アイデアID'
    field :level, String, null: false, description: '難易度レベル'
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false, description: '作成日時'
  end
end
