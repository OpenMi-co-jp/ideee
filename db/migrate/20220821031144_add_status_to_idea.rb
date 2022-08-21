class AddStatusToIdea < ActiveRecord::Migration[6.1]
  def change
    add_column :ideas, :status, :integer, default: 0
  end
end
