# frozen_string_literal: true

100.times do |n|
  num = n + 1
  Comment.seed(
    :id,
    { id: num, description: Faker::JapaneseMedia::OnePiece.quote, user: User.all.sample, idea: Idea.all.sample }
  )
end
