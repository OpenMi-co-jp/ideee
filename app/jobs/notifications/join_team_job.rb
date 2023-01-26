# frozen_string_literal: true

module Notifications
  class JoinTeamJob < ApplicationJob
    queue_as :default

    def perform(current_user, idea)
      SendEmail.new.join_team(current_user, idea) if idea.user.team_join_email && Rails.env.production?
      team_user = TeamUser.find_by!(user: current_user, team: idea.team)
      current_user.create_notification(idea:, visited_id: idea.user_id, notificatable: team_user)
    end
  end
end
