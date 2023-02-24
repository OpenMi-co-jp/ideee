class AddTeamLeaveEmailToNotificationConfig < ActiveRecord::Migration[6.1]
  def change
    add_column :notification_configs, :team_leave_email, :boolean, null: false, default: true
  end
end
