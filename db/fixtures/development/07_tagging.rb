100.times do |n|
  num = n + 1
  Tagging.seed(
    :id,
    { id: num, idea: Idea.all.sample, tag: Tag.all.sample }
  )
  # 同一の組み合わせがあった場合はrescueでエラーハンドリング
rescue ActiveRecord::RecordNotUnique
end
