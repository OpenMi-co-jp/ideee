# == Schema Information
#
# Table name: likes
#
#  id           :bigint           not null, primary key
#  likable_type :string(255)      not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  likable_id   :bigint           not null
#  user_id      :bigint
#
# Indexes
#
#  index_likes_on_likable  (likable_type,likable_id)
#  index_likes_on_user_id  (user_id)
#
FactoryBot.define do
  factory :like do
    user

    trait :idea do
      likable_id { FactoryBot.create(:idea).id }
      likable_type { 'Idea' }
    end

    trait :comment do
      likable_id { FactoryBot.create(:comment).id }
      likable_type { 'Comment' }
    end
  end
end
