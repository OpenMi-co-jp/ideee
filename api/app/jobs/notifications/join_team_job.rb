# frozen_string_literal: true

module Notifications
  class JoinTeamJob < ApplicationJob
    queue_as :high

    def perform(current_user, team)
      idea = team.idea
      SendEmail.new.join_team(current_user, idea) if idea.user.team_join_email && Rails.env.production?
      team_user_id = ::TeamUser.find_by(user_id: current_user.id, team_id: team.id).id
      current_user.create_notification(idea:, visited_id: idea.user_id, notificatable_id: team_user_id, notificatable_type: 'join_team_user')
    end
  end
end
