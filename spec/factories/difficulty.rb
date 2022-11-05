# == Schema Information
#
# Table name: difficulties
#
#  id         :bigint           not null, primary key
#  level      :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  idea_id    :bigint           not null
#  user_id    :bigint           not null
#
# Indexes
#
#  index_difficulties_on_idea_id              (idea_id)
#  index_difficulties_on_user_id              (user_id)
#  index_difficulties_on_user_id_and_idea_id  (user_id,idea_id) UNIQUE
#
# Foreign Keys
#
#  fk_rails_...  (idea_id => ideas.id)
#  fk_rails_...  (user_id => users.id)
#
FactoryBot.define do
  factory :difficulty do
    trait :easy do
      level { 1 }
    end
    trait :middle do
      level { 2 }
    end
    trait :hard do
      level { 3 }
    end
    user
    idea
  end
end
