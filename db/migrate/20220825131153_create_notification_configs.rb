# frozen_string_literal: true

class CreateNotificationConfigs < ActiveRecord::Migration[6.1]
  def change
    create_table :notification_configs do |t|
      t.references :user, null: false, foreign_key: true

      # メールの送信設定
      t.boolean :heart_email, null: false, default: true
      t.boolean :comment_email, null: false, default: true
      t.boolean :draft_remind_email, null: false, default: true
      t.boolean :team_join_email, null: false, default: true
      t.boolean :team_message_email, null: false, default: true
      t.boolean :weekly_email, null: false, default: true
      t.boolean :event_email, null: false, default: true

      # アプリの通知設定
      t.boolean :heart_web, null: false, default: true
      t.boolean :comment_web, null: false, default: true
      t.boolean :heart_to_comment_web, null: false, default: true
      t.boolean :vote_web, null: false, default: true
      t.boolean :team_join_web, null: false, default: true

      t.timestamps
    end
  end
end
