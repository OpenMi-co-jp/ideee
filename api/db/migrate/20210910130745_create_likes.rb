# frozen_string_literal: true

class CreateLikes < ActiveRecord::Migration[6.1]
  def change
    create_table :likes do |t|
      t.references :user
      t.references :idea

      t.index %i[user_id idea_id], unique: true
      t.timestamps
    end
  end
end
