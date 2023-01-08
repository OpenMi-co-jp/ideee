module Notifications
  class WithdrawTeamJob < ApplicationJob
    queue_as :default

    def perform(current_user, idea)
      SendEmail.new.withdraw_team(current_user, idea) if idea.user.team_join_email
      current_user.create_notification_team(idea:, visited_id: idea.user_id, notificatable_type: "withdraw_team_user")
    end
  end
end
