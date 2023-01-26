# frozen_string_literal: true

class CreateNotifications < ActiveRecord::Migration[6.1]
  def change
    create_table :notifications do |t|
      t.integer :visitor_id
      t.integer :visited_id
      t.integer :idea_id
      t.integer :comment_id
      t.integer :like_id
      t.integer :action, null: false
      t.boolean :checked, default: false, null: false

      t.timestamps
    end
  end
end
