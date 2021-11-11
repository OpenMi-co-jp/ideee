class AddCommentsNumToIdea < ActiveRecord::Migration[6.1]
  def change
    add_column :ideas, :comments_num, :integer, default: 0
  end
end
