# frozen_string_literal: true

module Types
  class Idea::IdeasType < Types::BaseObject
    field :nodes, [Types::Idea::IdeaType], null: false, description: 'アイデアオブジェクト'
    field :page_info, Types::PaginationType, null: true, description: 'ページネーション情報'
  end
end
