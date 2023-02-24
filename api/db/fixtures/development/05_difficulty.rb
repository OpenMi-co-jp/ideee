# frozen_string_literal: true

200.times do |n|
  num = n + 1
  Difficulty.seed(
    :id,
    { id: num, user: User.all.sample, idea: Idea.all.sample, level: Difficulty.levels.keys.sample }
  )
  # 同一の組み合わせがあった場合はrescueでエラーハンドリング
rescue ActiveRecord::RecordNotUnique
end
