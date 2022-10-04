class AddTeamMembersNumToIdeas < ActiveRecord::Migration[6.1]
  def change
    add_column :ideas, :team_members_num, :integer, limit: 2, default: 0
  end
end
