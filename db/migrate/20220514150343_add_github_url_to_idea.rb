class AddGithubUrlToIdea < ActiveRecord::Migration[6.1]
  def change
    add_column :ideas, :github_url, :string
  end
end
