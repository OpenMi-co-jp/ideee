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
#  visitor_id :integer
#
class Notification < ApplicationRecord
  belongs_to :idea, optional: true
  belongs_to :comment, optional: true
  belongs_to :like, optional: true
  belongs_to :visitor, class_name: 'User', foreign_key: 'visitor_id', optional: true
  belongs_to :visited, class_name: 'User', foreign_key: 'visited_id', optional: true
end
