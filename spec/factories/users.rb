FactoryBot.define do
  factory :user do
    name { Faker::JapaneseMedia::OnePiece.character }
    sequence(:email)   { |n| "sample#{n}@example.com" }
    definition { 2 }
    defined { true }
    confirmed_at { Time.now }
    password { 'password' }
  end
end
