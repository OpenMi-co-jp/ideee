class MoveTeamMembersNum < ActiveRecord::Migration[7.0]
  def change
    remove_column :ideas, :team_members_num, :integer
    add_column :teams, :members_num, :integer, default: 0
  end
end
