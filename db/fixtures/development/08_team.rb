30.times do |n|
  num = n + 1
  idea = Idea.select { |i| i.team.nil? }.sample
  Team.seed(
    :id,
    {
      id: num,
      idea: idea,
      offer: Faker::JapaneseMedia::StudioGhibli.character,
      requirement: Faker::JapaneseMedia::StudioGhibli.quote,
      status: [0, 1, 2].sample,
      owner_id: idea.user_id
    }
  )
  # 同一の組み合わせがあった場合はrescueでエラーハンドリング
rescue ActiveRecord::RecordNotUnique
end
