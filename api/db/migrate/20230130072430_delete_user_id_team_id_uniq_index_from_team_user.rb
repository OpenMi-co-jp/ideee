class DeleteUserIdTeamIdUniqIndexFromTeamUser < ActiveRecord::Migration[6.1]
  def change
    remove_index :team_users, %i[user_id team_id]
  end
end
