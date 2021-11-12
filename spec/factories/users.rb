FactoryBot.define do
  factory :user do
    name { Faker::JapaneseMedia::OnePiece.character }
    sequence(:email)   { |n| "sample#{n}@example.com" }
    definition { User.definitions.values.sample }
    defined { true }
    confirmed_at { Time.now }
    password { 'password' }

    trait :idea_man do
      definition { 0 }
    end
    trait :engineer do
      definition { 1 }
    end
    trait :idea_engineer do
      definition { 2 }
    end
  end
end
