# frozen_string_literal: true

40.times do |n|
  num = n + 1
  User.seed(
    :id,
    {
      id: num,
      name: Faker::JapaneseMedia::OnePiece.character,
      password: 'password',
      email: Faker::Internet.email,
      definition: [0, 1, 2].sample,
      confirmed_at: Time.zone.now,
      defined: true
    }
  )
end

# 後々のadmin user実装時用
User.seed(
  :id,
  {
    id: 41,
    name: 'admin',
    password: 'password',
    email: 'admin@admin.com',
    definition: 0,
    confirmed_at: Time.zone.now,
    defined: true
  }
)
