50.times do |n|
  num = n + 1
  TeamUser.seed(
    :id,
    {
      id: num,
      team: Team.all.sample,
      user: User.all.sample
    }
  )
end
