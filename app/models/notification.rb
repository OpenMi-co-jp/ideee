# == Schema Information
#
# Table name: notifications
#
#  id         :bigint           not null, primary key
#  action     :string(255)
#  checked    :boolean          default(FALSE), not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  comment_id :integer
#  idea_id    :integer
#  like_id    :integer
#  visited_id :integer
#  visiter_id :integer
#
class Notification < ApplicationRecord
  belongs_to :idea
  belongs_to :comment
  belongs_to :like
  belongs_to :visiter, class_name: 'User', foreign_key: 'visiter_id'
  belongs_to :visited, class_name: 'User', foreign_key: 'visited_id'
end
