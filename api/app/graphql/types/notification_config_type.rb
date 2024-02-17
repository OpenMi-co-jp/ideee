module Types
  class NotificationConfigType < Types::BaseObject
    field :id, ID, null: false, description: '通知設定ID'
    field :user_id, ID, null: false, description: 'ユーザーID'
    field :heart_email, Boolean, null: false, description: 'ユーザーのアイデアに「いいね!」を送信する'
    field :comment_email, Boolean, null: false, description: 'ユーザーのアイデアに「コメント」を送信する'
    field :draft_remind_email, Boolean, null: false, description: '下書きアイデアに「下書きアイデアあり」を送信する'
    field :team_join_email, Boolean, null: false, description: 'ユーザーのチームに「参加」を送信する'
    field :team_message_email, Boolean, null: false, description: 'ユーザーのチームに「メッセージ」を送信する'
    field :weekly_email, Boolean, null: false, description: 'ユーザーのアイデアに「週間アイデアあり」を送信する'
    field :event_email, Boolean, null: false, description: 'ユーザーのアイデアに「イベント」を送信する'
    field :heart_web, Boolean, null: false, description: 'ユーザーのアイデアに「いいね!」を送信する'
    field :comment_web, Boolean, null: false, description: 'ユーザーのアイデアに「コメント」を送信する'
    field :heart_to_comment_web, Boolean, null: false, description: 'ユーザーのアイデアに「いいね!」を送信する'
    field :vote_web, Boolean, null: false, description: 'ユーザーのアイデアに「投票」を送信する'
    field :team_join_web, Boolean, null: false, description: 'ユーザーのチームに「参加」を送信する'
  end
end
