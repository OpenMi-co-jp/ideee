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
class Difficulty < ApplicationRecord
  belongs_to :user
  belongs_to :idea
  enum level: { easy: 1, middle: 2, hard: 3 }
end
