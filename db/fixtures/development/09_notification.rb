100.times do |n|
  num = n + 1
  visitor = User.all.sample
  visited = User.all.where.not(id: visitor.id).sample
  Notification.seed(
    :id,
    { id: num, visitor: visitor, visited: visited, idea: Idea.all.sample, like: Like.all.sample, action: 0 }
  )
  # いいねするユーザーとコメントするユーザーを分けるため
  visitor = User.all.sample
  visited = User.all.where.not(id: visitor.id).sample
  Notification.seed(
    :id,
    { id: 100 + num, visitor: visitor, visited: visited, idea: Idea.all.sample, comment: Comment.all.sample,
      action: 1 }
  )
end
