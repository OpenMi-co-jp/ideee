30.times do |n|
  num = n + 1
  User.seed(
    :id,
    { id: num, name: Faker::JapaneseMedia::OnePiece.character, password: 'password', email: Faker::Internet.email, definition: [0,1,2].sample },
  )
end

# 後々のadmin user実装時用
User.seed(
  :id,
  { id: 31, name: 'admin', password: 'password', email: 'admin@admin.com', definition: 0 },
)