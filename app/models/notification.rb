# == Schema Information
#
# Table name: notifications
#
#  id                 :bigint           not null, primary key
#  checked            :boolean          default(FALSE), not null
#  notificatable_type :string(255)
#  send_at            :datetime
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#  idea_id            :integer
#  notificatable_id   :integer
#  visited_id         :integer
#  visitor_id         :integer
#
# Indexes
#
#  index_notifications_on_notificatable_id_and_notificatable_type  (notificatable_id,notificatable_type)
#
class Notification < ApplicationRecord
  belongs_to :idea, optional: true
  belongs_to :notificatable, polymorphic: true, optional: true
  belongs_to :visitor, class_name: 'User', foreign_key: 'visitor_id', optional: true
  # visitedは活用事例が無ければ削除予定
  belongs_to :visited, class_name: 'User', foreign_key: 'visited_id', optional: true

  scope :not_sent_likes, -> { where(notificatable_type: 'LikeIdea').where(send_at: nil) }
end
