# == Schema Information
#
# Table name: reviews
#
#  id         :bigint           not null, primary key
#  content    :text(65535)      not null
#  stance     :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  idea_id    :bigint           not null
#
# Indexes
#
#  index_reviews_on_idea_id  (idea_id)
#
# Foreign Keys
#
#  fk_rails_...  (idea_id => ideas.id)
#
class Review < ApplicationRecord
  belongs_to :idea
  enum stance: { negative: 0, positive: 1 }

  validates :content, presence: true
end
