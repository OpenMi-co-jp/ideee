# frozen_string_literal: true

class AddDefineToUser < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :defined, :boolean
  end
end
