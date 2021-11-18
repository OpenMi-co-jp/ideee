# == Schema Information
#
# Table name: ideas
#
#  id          :bigint           not null, primary key
#  difficulty  :integer          default("not_yet")
#  draft       :boolean          default(FALSE)
#  icon        :string(255)
#  likes_num   :integer          default(0)
#  name        :string(255)
#  note        :text(65535)
#  recruitment :integer          default("not_started")
#  view        :integer
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  user_id     :bigint           not null
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
    note { Faker::Lorem.paragraph(sentence_count: 20) }
    icon { File.open(carriwave_path) }
    view { (0..200).to_a.sample }
    user
  end
end
