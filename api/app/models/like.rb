# frozen_string_literal: true

# == Schema Information
#
# Table name: likes
#
#  id           :bigint           not null, primary key
#  likable_type :string(255)      not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  likable_id   :bigint           not null
#  user_id      :bigint
#
# Indexes
#
#  index_likes_on_likable  (likable_type,likable_id)
#  index_likes_on_user_id  (user_id)
#
class Like < ApplicationRecord
  belongs_to :user
  belongs_to :likable, polymorphic: true, optional: true

  has_many :notifications, dependent: :destroy, as: :notificatable
  counter_culture :likable

  scope :type_idea_ids, -> { where(likable_type: 'Idea').pluck(:likable_id) }
end
