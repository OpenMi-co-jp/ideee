module Notifications
  class LeaveTeamJob < ApplicationJob
    queue_as :default

    def perform(current_user, team)
      idea = team.idea
      SendEmail.new.leave_team(current_user, idea) if team.owner.team_leave_email && Rails.env.production?
      team_user_id = ::TeamUser.find_by(user_id: current_user.id, team_id: team.id).id
      current_user.create_notification(idea:, visited_id: idea.user_id, notificatable_id: team_user_id, notificatable_type: 'leave_team_user')
    end
  end
end
