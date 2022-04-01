30.times do |n|
  num = n + 1
  Team.seed(
    :id,
    {
      id: num,
      idea: Idea.select{|i| i.team == nil}.sample,
      offer: Faker::JapaneseMedia::StudioGhibli.character,
      requirement: Faker::JapaneseMedia::StudioGhibli.quote,
      status: Faker::JapaneseMedia::StudioGhibli.movie
    }
  )
  # 同一の組み合わせがあった場合はrescueでエラーハンドリング
rescue ActiveRecord::RecordNotUnique
end
