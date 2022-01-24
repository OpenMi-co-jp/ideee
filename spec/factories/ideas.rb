# == Schema Information
#
# Table name: ideas
#
#  id            :bigint           not null, primary key
#  background    :string(255)      not null
#  comments_num  :integer          default(0)
#  cooperation   :integer          default("not_started")
#  difficulty    :integer          default("not_yet")
#  draft         :boolean          default(FALSE)
#  goal          :string(255)      not null
#  hypothesis    :string(255)
#  icon          :string(255)
#  issue         :string(255)
#  likes_num     :integer          default(0)
#  name          :string(255)
#  note          :text(65535)
#  product_apply :integer          default("no_apply")
#  product_url   :string(255)
#  published_at  :datetime
#  similar       :string(255)
#  target        :string(255)
#  view          :integer
#  wish_function :string(255)
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  user_id       :bigint           not null
#
# Indexes
#
#  index_ideas_on_user_id  (user_id)
#
carriwave_path = "./app/assets/images/idea_main.png"
# これを書かないとなぜか関連モデルが作成されない
FactoryBot.use_parent_strategy = false

FactoryBot.define do
  factory :idea do
    name { Faker::JapaneseMedia::Doraemon.gadget }
    background { Faker::Creature::Animal.name }
    goal { Faker::Fantasy::Tolkien.character }
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
