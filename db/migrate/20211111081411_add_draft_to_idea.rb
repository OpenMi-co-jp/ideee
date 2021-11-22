class AddDraftToIdea < ActiveRecord::Migration[6.1]
  def change
    add_column :ideas, :draft, :boolean, default: false
  end
end
