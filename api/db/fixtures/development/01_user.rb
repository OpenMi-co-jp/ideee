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
      defined: true,
      remote_url: Faker::Avatar.image
    }
  )
end
