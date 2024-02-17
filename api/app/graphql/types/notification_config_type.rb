module Types
  class NotificationConfigType < Types::BaseObject
    field :id, ID, null: false
    field :user_id, ID, null: false
    field :heart_email, Boolean, null: false
    field :comment_email, Boolean, null: false
    field :draft_remind_email, Boolean, null: false
    field :team_join_email, Boolean, null: false
    field :team_message_email, Boolean, null: false
    field :weekly_email, Boolean, null: false
    field :event_email, Boolean, null: false
    field :heart_web, Boolean, null: false
    field :comment_web, Boolean, null: false
    field :heart_to_comment_web, Boolean, null: false
    field :vote_web, Boolean, null: false
    field :team_join_web, Boolean, null: false
  end
end
