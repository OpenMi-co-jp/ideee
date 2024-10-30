# frozen_string_literal: true

module Types
  class Idea::AiIdeasType < Types::BaseObject
    field :name, String, null: false, description: 'AIアイデア名'
    field :goal, String, description: 'ゴール'
    field :background, String, description: '背景'
    field :idea_tags, [String], null: true, description: 'タグオブジェクト'
  end
end
