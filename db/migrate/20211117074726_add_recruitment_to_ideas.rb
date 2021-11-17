class AddRecruitmentToIdeas < ActiveRecord::Migration[6.1]
  def change
    add_column :ideas, :recruitment, :integer, default: 0
  end
end
