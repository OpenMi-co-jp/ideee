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
FactoryBot.define do
  factory :message do
    user
    room
    content { Faker::Lorem.paragraph(sentence_count: 20) }
  end
end
