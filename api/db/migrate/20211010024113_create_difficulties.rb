# frozen_string_literal: true

class CreateDifficulties < ActiveRecord::Migration[6.1]
  def change
    create_table :difficulties do |t|
      t.references :user, null: false, foreign_key: true
      t.references :idea, null: false, foreign_key: true
      t.integer :level, null: false

      t.index %i[user_id idea_id], unique: true
      t.timestamps
    end
  end
end
