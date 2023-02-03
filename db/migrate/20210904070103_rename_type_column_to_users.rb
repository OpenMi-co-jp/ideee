# frozen_string_literal: true

class RenameTypeColumnToUsers < ActiveRecord::Migration[6.1]
  def change
    rename_column :users, :type, :definition
    change_column :users, :definition, :integer, limit: 2
  end
end
