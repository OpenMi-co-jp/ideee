# frozen_string_literal: true

module Types
  class Idea::SuggestIdeasType < Types::BaseObject
    field :nodes, [Types::Idea::IdeaType], null: false, description: 'アイデアオブジェクト'
    field :title, String, null: false, description: 'サジェストアイデアタイトル'
  end
end
