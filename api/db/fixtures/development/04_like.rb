# frozen_string_literal: true

300.times do |n|
  num = n + 1
  Like.seed(
    :id,
    { id: num, user: User.all.sample, likable: Idea.all.sample }
  )
end
