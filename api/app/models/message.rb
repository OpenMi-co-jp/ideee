# frozen_string_literal: true

# == Schema Information
#
# Table name: messages
#
#  id         :bigint           not null, primary key
#  content    :text(65535)
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  room_id    :string(255)      not null
#  user_id    :bigint           not null
#
# Indexes
#
#  index_messages_on_user_id  (user_id)
#
class Message < ApplicationRecord
  belongs_to :room
  belongs_to :user
end
