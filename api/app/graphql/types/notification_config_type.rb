module Types
  class NotificationConfigType < Types::BaseObject
    field :id, ID, null: false, description: '通知設定ID'
    field :user_id, ID, null: false, description: 'ユーザーID'
    field :heart_email, Boolean, null: false, description: 'ハートのお知らせ'
    field :comment_email, Boolean, null: false, description: 'アイデアへのコメント'
    field :draft_remind_email, Boolean, null: false, description: '下書きへのリマインド'
    field :team_join_email, Boolean, null: false, description: 'チーム開発参加のお知らせ'
    field :team_message_email, Boolean, null: false, description: 'チーム開発のメッセージ'
    field :weekly_email, Boolean, null: false, description: '週間ランキング'
    field :event_email, Boolean, null: false, description: 'イベントのお知らせ'
    field :heart_web, Boolean, null: false, description: 'ハートのお知らせ(Web)'
    field :comment_web, Boolean, null: false, description: 'コメントのお知らせ'
    field :heart_to_comment_web, Boolean, null: false, description: 'ハートへのコメント'
    field :vote_web, Boolean, null: false, description: '投票のお知らせ'
    field :team_join_web, Boolean, null: false, description: 'チーム開発参加のお知らせ(Web)'
  end
end
