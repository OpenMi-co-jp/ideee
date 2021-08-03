class AddUserColumns < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :name, :string, unique: true, limit: 30, null: false
    add_column :users, :description, :string, limit: 200
    add_column :users, :point, :integer
    add_column :users, :icon, :string
    add_column :users, :type, :integer
    add_column :users, :twitter_id, :string
  end
end
