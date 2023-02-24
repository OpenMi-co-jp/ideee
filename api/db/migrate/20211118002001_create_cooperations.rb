# frozen_string_literal: true

class CreateCooperations < ActiveRecord::Migration[6.1]
  def change
    create_table :cooperations do |t|
      t.references :user, null: false, foreign_key: true
      t.references :idea, null: false, foreign_key: true

      t.timestamps
    end

    add_index :cooperations, %i[idea_id user_id], unique: true
  end
end
