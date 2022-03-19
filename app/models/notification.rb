# == Schema Information
#
# Table name: notifications
#
#  id                 :bigint           not null, primary key
#  action             :integer          not null
#  checked            :boolean          default(FALSE), not null
#  notificatable_type :string(255)
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#  comment_id         :integer
#  idea_id            :integer
#  like_id            :integer
#  notificatable_id   :integer
#  visited_id         :integer
#  visitor_id         :integer
#
# Indexes
#
#  index_notifications_on_notificatable_id_and_notificatable_type  (notificatable_id,notificatable_type) UNIQUE
#
class Notification < ApplicationRecord
  belongs_to :idea, optional: true
  belongs_to :comment, optional: true
  belongs_to :like, optional: true
  belongs_to :notificatable, polymorphic: true
  belongs_to :visitor, class_name: 'User', foreign_key: 'visitor_id', optional: true
  # visitedは活用事例が無ければ削除予定
  belongs_to :visited, class_name: 'User', foreign_key: 'visited_id', optional: true

  enum action: %i[like comment], _prefix: true
end
