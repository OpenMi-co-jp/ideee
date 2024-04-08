# frozen_string_literal: true

module Types
  class Notification::NotificationType < Types::BaseObject
    field :id, ID, null: false, description: '通知ID'
    field :visitor_id, Integer, description: '通知者ID'
    field :visited_id, Integer, description: '受信者ID'
    field :idea_id, Integer, description: 'アイデアID'
    field :checked, Boolean, null: false, description: '確認フラグ'
    field :notificatable_id, Integer, description: 'ポリモーフィックID'
    field :notificatable_type, String, description: 'ポリモーフィックタイプ'
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false, description: '作成日'
    field :send_at, GraphQL::Types::ISO8601DateTime, description: 'メール送信日'

    field :visitor, Types::UserType, description: '通知者'
    field :visited, Types::UserType, description: '受信者'
    field :idea, Types::Idea::IdeaType, description: 'アイデア'
  end
end
