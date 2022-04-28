50.times do |n|
  num = n + 1
  Team.seed(
    :id,
    { id: num, team: Team.all.sample, idea: Idea.select { |i| i.team.nil? }.sample }
  )
end
