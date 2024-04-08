# frozen_string_literal: true

module Types
  class Notification::NotificationsType < Types::BaseObject
    field :nodes, [Types::Notification::NotificationType], null: false, description: '通知オブジェクト一覧'
    field :page_info, Types::PaginationType, null: true, description: 'ページネーション情報'
  end
end
