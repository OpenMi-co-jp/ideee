module Notifications
  class JoinTeamJob < ApplicationJob
    queue_as :default

    def perform(current_user, idea)
      SendEmail.new.join_team(current_user, idea) if idea.user.team_join_email && Rails.env.production?
      team_user_id = TeamUser.find_by!(user: current_user, team: idea.team).id
      current_user.create_notification_team(idea:, visited_id: idea.user_id, notificatable_id: team_user_id, notificatable_type: "join_team_user")
    end
  end
end
