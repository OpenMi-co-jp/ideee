FactoryBot.define do
  factory :comment do
    description { Faker::JapaneseMedia::OnePiece.quote }
    user
    idea
  end
end
