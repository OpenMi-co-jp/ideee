# frozen_string_literal: true

module Types
  class DifficultyType < Types::BaseObject
    field :id, ID, null: false, description: 'ID'
    field :user_id, Integer, null: false, description: 'ユーザーID'
    field :idea_id, Integer, null: false, description: 'アイデアID'
    field :level, Integer, null: false, description: '難易度'
  end
end
