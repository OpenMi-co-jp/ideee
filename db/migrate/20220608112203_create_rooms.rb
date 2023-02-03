# frozen_string_literal: true

class CreateRooms < ActiveRecord::Migration[6.1]
  def change
    create_table :rooms, id: :string do |t|
      t.references :team, null: true, index: false

      t.timestamps
    end
  end
end
