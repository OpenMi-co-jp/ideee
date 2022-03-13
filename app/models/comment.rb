# == Schema Information
#
# Table name: comments
#
#  id          :bigint           not null, primary key
#  description :text(65535)      not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  idea_id     :bigint           not null
#  user_id     :bigint           not null
#
# Indexes
#
#  index_comments_on_idea_id  (idea_id)
#  index_comments_on_user_id  (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (idea_id => ideas.id)
#  fk_rails_...  (user_id => users.id)
#
class Comment < ApplicationRecord
  belongs_to :user
  belongs_to :idea
  validates :description, presence: true

  has_many :notifications, dependent: :destroy

  scope :weekly_comments, -> { where(created_at: 7.days.ago..Time.now) }
  scope :pickup_user_commets, ->(num) { group_by(&:user_id).transform_values(&:size).max(num) { |x, y| x[1] <=> y[1] } }
end
