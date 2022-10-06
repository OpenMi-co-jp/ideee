class AddIdeaNumToUser < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :ideas_num, :integer, limit: 2, default: 0
  end
end
