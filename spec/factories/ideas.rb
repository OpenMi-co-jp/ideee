carriwave_path = "./app/assets/images/idea_main.png"
# これを書かないとなぜか関連モデルが作成されない
FactoryBot.use_parent_strategy = false

FactoryBot.define do
  factory :idea do
    name { Faker::JapaneseMedia::Doraemon.gadget }
    note { Faker::Lorem.paragraph(sentence_count: 20) }
    icon { File.open(carriwave_path) }
    view { (0..200).to_a.sample }
    user

    trait :empty_name do
      name { '' }
    end

    trait :updated_idea do
      name { 'updated idea' }
    end
  end
end
