# frozen_string_literal: true

class RemoveUnusedColumnsFromNotification < ActiveRecord::Migration[6.1]
  def change
    remove_column :notifications, :action, :integer
    remove_column :notifications, :like_id, :integer
    remove_column :notifications, :comment_id, :integer
  end
end
