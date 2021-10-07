100.times do |n|
  num = n + 1
  Comment.seed(
    :id,
    { id: num, description: Faker::JapaneseMedia::OnePiece.quote, user: User.find((1..User.count).to_a.sample), idea: Idea.find((1..Idea.count).to_a.sample) },
  )
end