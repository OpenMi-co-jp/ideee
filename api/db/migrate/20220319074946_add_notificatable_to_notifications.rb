# frozen_string_literal: true

class AddNotificatableToNotifications < ActiveRecord::Migration[6.1]
  def change
    add_column :notifications, :notificatable_id, :integer
    add_column :notifications, :notificatable_type, :string
    add_index :notifications, %i[notificatable_id notificatable_type]
  end
end
