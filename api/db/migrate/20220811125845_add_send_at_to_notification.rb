# frozen_string_literal: true

class AddSendAtToNotification < ActiveRecord::Migration[6.1]
  def change
    add_column :notifications, :send_at, :datetime
  end
end
