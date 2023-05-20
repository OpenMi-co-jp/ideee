# frozen_string_literal: true

class CreateTeamUsers < ActiveRecord::Migration[6.1]
  def change
    create_table :team_users do |t|
      t.references :user
      t.references :team
      t.timestamps
    end
    add_index :team_users, %i[user_id team_id], unique: true
  end
end
