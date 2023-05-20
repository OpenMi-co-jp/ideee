# frozen_string_literal: true

namespace :transfer_cooperation_to_teams do
  desc '既存のcooperationをteamに移行する'
  task migrate: :environment do
    Idea.where.not(cooperation: :completed).map do |idea|
      if idea.team&.status_active?
        team = Team.create!(owner: idea.user, idea:, status: 0, offer: '-', requirement: '-')
        if idea.team.members_num.positive?
          idea.team.members.each do |user|
            TeamUser.create(team_id: team.id, user:)
          end
        end
      elsif idea.cooperation_completed?
        Team.create!(idea:, user: idea.user, status: 2, offer: '-', requirement: '-')
      end
    end
  end
end
