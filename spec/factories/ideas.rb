# frozen_string_literal: true

# == Schema Information
#
# Table name: ideas
#
#  id                                                       :bigint           not null, primary key
#  background                                               :string(255)
#  comments_num                                             :integer          default(0)
#  difficulty                                               :integer          default("not_yet")
#  draft                                                    :boolean          default(FALSE)
#  emailed_at(weeklyメールで新規アイデアとして送られた日時) :datetime
#  github_url                                               :string(255)
#  goal                                                     :string(255)
#  hypothesis                                               :string(255)
#  icon                                                     :string(255)
#  issue                                                    :string(255)
#  likes_num                                                :integer          default(0)
#  monetize                                                 :string(255)
#  name                                                     :string(255)
#  note                                                     :text(65535)
#  product_apply                                            :integer          default("no_apply")
#  product_url                                              :string(255)
#  published_at                                             :datetime
#  similar                                                  :string(255)
#  stance                                                   :integer          default("free_right")
#  target                                                   :string(255)
#  team_members_num                                         :integer          default(0)
#  view                                                     :integer          default(0)
#  wish_function                                            :string(255)
#  created_at                                               :datetime         not null
#  updated_at                                               :datetime         not null
#  user_id                                                  :bigint           not null
#
# Indexes
#
#  index_ideas_on_user_id  (user_id)
#

# これを書かないとなぜか関連モデルが作成されない
FactoryBot.use_parent_strategy = false

FactoryBot.define do
  factory :idea do
    name { Faker::JapaneseMedia::Doraemon.gadget }
    background { Faker::Creature::Animal.name }
    goal { Faker::Fantasy::Tolkien.character }
    note { Faker::Lorem.paragraph(sentence_count: 20) }
    view { (0..200).to_a.sample }
    product_url { Faker::Internet.url }
    github_url { Faker::Internet.url }
    user

    trait :like do
      likes { [FactoryBot.build(:like)] }
    end
  end
end
