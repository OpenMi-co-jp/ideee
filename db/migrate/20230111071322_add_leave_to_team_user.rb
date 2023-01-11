class AddLeaveToTeamUser < ActiveRecord::Migration[6.1]
  def change
    add_column :team_users, :leave, :boolean, null: false, default: false
  end
end
