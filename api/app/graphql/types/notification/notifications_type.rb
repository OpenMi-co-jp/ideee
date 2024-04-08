# frozen_string_literal: true

module Types
  class Notification::NotificationsType < Types::BaseObject
    field :nodes, [Types::Notification::NotificationType], null: false
    field :page_info, Types::PaginationType, null: true
  end
end
