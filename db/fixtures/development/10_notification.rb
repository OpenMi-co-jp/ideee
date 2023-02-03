# frozen_string_literal: true

100.times do |n|
  num = n + 1
  visitor = User.all.sample
  visited = User.all.where.not(id: visitor.id).sample
  Notification.seed(
    :id,
    { id: num, visitor:, visited:, idea: Idea.all.sample, notificatable: Like.all.sample }
  )
  # ハートを送るユーザーとコメントするユーザーを分けるため
  visitor = User.all.sample
  visited = User.all.where.not(id: visitor.id).sample
  Notification.seed(
    :id,
    { id: 100 + num, visitor:, visited:, idea: Idea.all.sample, notificatable: Comment.all.sample }
  )
end
