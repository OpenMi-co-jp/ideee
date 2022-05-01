# == Schema Information
#
# Table name: likes
#
#  id           :bigint           not null, primary key
#  likable_type :string(255)      not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  idea_id      :bigint
#  likable_id   :bigint           not null
#  user_id      :bigint
#
# Indexes
#
#  index_likes_on_idea_id              (idea_id)
#  index_likes_on_likable              (likable_type,likable_id)
#  index_likes_on_user_id              (user_id)
#  index_likes_on_user_id_and_idea_id  (user_id,idea_id) UNIQUE
#
class Like < ApplicationRecord
  belongs_to :user
  belongs_to :idea, optional: true # TODO: データ移行後削除
  belongs_to :likable, polymorphic: true, optional: true

  has_many :notifications, dependent: :destroy, as: :notificatable

  scope :type_idea_ids, -> { where(likable_type: 'Idea').pluck(:likable_id) }
end
