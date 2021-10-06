User.seed(
  :id,
  { id: 1, name: Faker::Name.name, password: 'password', email: Faker::Internet.email },
  { id: 2, name: Faker::Name.name, password: 'password', email: Faker::Internet.email },
  { id: 3, name: Faker::Name.name, password: 'password', email: Faker::Internet.email },
  { id: 4, name: Faker::Name.name, password: 'password', email: Faker::Internet.email },
  { id: 5, name: Faker::Name.name, password: 'password', email: Faker::Internet.email },
)
