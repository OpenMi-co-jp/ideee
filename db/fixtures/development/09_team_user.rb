50.times do |n|
  num = n + 1
  team = Team.all.sample
  TeamUser.seed(
    :id,
    {
      id: num,
      team: team,
      user: User.where.not(id: team.members.pluck(:id)).sample
    }
  )
end
