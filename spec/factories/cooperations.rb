# == Schema Information
#
# Table name: cooperations
#
#  id         :bigint           not null, primary key
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  idea_id    :bigint           not null
#  user_id    :bigint           not null
#
# Indexes
#
#  index_cooperations_on_idea_id              (idea_id)
#  index_cooperations_on_idea_id_and_user_id  (idea_id,user_id) UNIQUE
#  index_cooperations_on_user_id              (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (idea_id => ideas.id)
#  fk_rails_...  (user_id => users.id)
#
FactoryBot.define do
  factory :cooperation do
    user { nil }
    idea { nil }
  end
end
