40.times do |n|
  num = n + 1
  team = Team.all.sample
  TeamUser.seed(
    :id,
    {
      id: num,
      team: Team.all.sample,
      user_id: num
    }
  )
end
