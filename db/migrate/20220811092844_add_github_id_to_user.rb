class AddGithubIdToUser < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :github_id, :string
  end
end
