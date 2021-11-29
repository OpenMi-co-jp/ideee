# == Schema Information
#
# Table name: likes
#
#  id         :bigint           not null, primary key
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  idea_id    :bigint
#  user_id    :bigint
#
# Indexes
#
#  index_likes_on_idea_id              (idea_id)
#  index_likes_on_user_id              (user_id)
#  index_likes_on_user_id_and_idea_id  (user_id,idea_id) UNIQUE
#
FactoryBot.define do
  factory :like do
    user
    idea
  end
end
