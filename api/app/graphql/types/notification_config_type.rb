module Types
  class NotificationConfigType < Types::BaseObject
    field :id, ID, null: false, description: '通知設定ID'
    field :user_id, ID, null: false, description: 'ユーザーID'
    field :comment_email, Boolean, null: false, description: 'アイデアへのコメント'
    field :draft_remind_email, Boolean, null: false, description: '下書きへのリマインド'
    field :event_email, Boolean, null: false, description: 'イベントのお知らせ'
    field :heart_email, Boolean, null: false, description: 'ハートのお知らせ'
    field :team_join_email, Boolean, null: false, description: 'チーム開発参加のお知らせ'
    field :team_leave_email, Boolean, null: false, description: 'チーム開発脱退のお知らせ'
    field :team_message_email, Boolean, null: false, description: 'チーム開発のメッセージ'
    field :weekly_email, Boolean, null: false, description: '週間ランキング'
  end
end
