Like.seed(
  :id,
  { id: 1, user: User.find(1), idea: Idea.find(1) },
  { id: 2, user: User.find(2), idea: Idea.find(1) },
  { id: 3, user: User.find(1), idea: Idea.find(2) },
  { id: 4, user: User.find(2), idea: Idea.find(2) },
  { id: 5, user: User.find(1), idea: Idea.find(3) },
  { id: 6, user: User.find(2), idea: Idea.find(3) },
  { id: 7, user: User.find(1), idea: Idea.find(4) },
  { id: 8, user: User.find(2), idea: Idea.find(4) },
  { id: 9, user: User.find(1), idea: Idea.find(5) },
  { id: 10, user: User.find(2), idea: Idea.find(5) },
)