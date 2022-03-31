namespace :transfer_cooperation_to_teams do
  desc '既存のcooperationをteamに移行する'
  task migrate: :environment do
    Idea.where.not(cooperation: :completed).map do |idea|
      if idea.cooperation_ongoing?
        team = Team.create(owner: idea.user, idea: idea, status: 0, offer: '-', requirement: '-')
        if idea.cooperation_users.count.positive?
          idea.cooperation_users.each do |user|
            TeamUser.create(team_id: team.id, user: user)
          end
        end
      elsif idea.cooperation_completed?
        Team.create(idea: idea, user: idea.user, status: 2, offer: '-', requirement: '-')
      end
    end
  end
end
