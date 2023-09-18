# frozen_string_literal: true

module Types
  class PaginationType < Types::BaseObject
    field :total_count, Int, null: true, description: '総アイデア数'
    field :total_pages, Int, null: true, description: '総ページ数'
    field :per, Int, null: false, description: '1ページに表示するアイデア数'
    field :current_page, Int, null: false, description: '現在のページ'
    field :next_page, Int, null: true, description: '次のページ'
    field :prev_page, Int, null: true, description: '前のページ'
    field :is_first, Boolean, null: true, description: '最初のページ確認'
    field :is_last, Boolean, null: true, description: '最後のページ確認'
  end
end
