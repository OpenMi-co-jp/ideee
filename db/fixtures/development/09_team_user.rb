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
  # 同一の組み合わせがあった場合はrescueでエラーハンドリング
  rescue ActiveRecord::RecordNotUnique
end
