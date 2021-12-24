100.times do |n|
  num = n + 1
  Cooperation.seed(
    :id,
    { id: num, user: User.all.sample, idea: Idea.where.not(cooperation: :not_started).sample },
  )
  # 同一の組み合わせがあった場合はrescueでエラーハンドリング
  rescue ActiveRecord::RecordNotUnique
end
