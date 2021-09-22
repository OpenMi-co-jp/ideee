class AddUserUrls < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :remote_url, :string
    add_column :users, :site_url, :string
  end
end
