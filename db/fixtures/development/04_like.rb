300.times do |n|
  num = n + 1
  Like.seed(
    :id,
    { id: num, user: User.find((1..User.count).to_a.sample), idea: Idea.find((1..Idea.count).to_a.sample) },
  )
  # 同一の組み合わせがあった場合はrescueでエラーハンドリング
  rescue ActiveRecord::RecordNotUnique
end
