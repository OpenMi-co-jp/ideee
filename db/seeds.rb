User.create!(
  email: 'example@example.com',
  password: 'password',
)

5.times do |n|
  Idea.create!(
    name: "test#{n + 1}",
    note: "Example of Idea note#{n + 1}",
    user_id: 1
  )
end
