50.times do |n|
  num = n + 1
  Team.seed(
    :id,
    { id: num, team: Team.all.sample, idea: Idea.select{|i| i.team == nil}.sample }
  )
  # 同一の組み合わせがあった場合はrescueでエラーハンドリング
rescue ActiveRecord::RecordNotUnique
end
