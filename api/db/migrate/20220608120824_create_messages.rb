# frozen_string_literal: true

class CreateMessages < ActiveRecord::Migration[6.1]
  def change
    create_table :messages do |t|
      t.references :user, null: false
      t.string :room_id, null: false
      t.text :content
      t.timestamps
    end
  end
end
