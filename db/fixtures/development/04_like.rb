300.times do |n|
  num = n + 1
  Like.seed(
    :id,
    { id: num, user: User.all.sample, idea: Idea.all.sample }
  )
  # 同一の組み合わせがあった場合はrescueでエラーハンドリング
rescue ActiveRecord::RecordNotUnique
end
