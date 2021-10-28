FactoryBot.define do
  factory :tag do
    name { Faker::App.unique.name }
  end
end
