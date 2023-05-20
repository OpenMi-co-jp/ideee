# frozen_string_literal: true

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
FactoryBot.define do
  factory :notification do
    visitor_id { 1 }
    visited_id { 1 }
    idea_id { 1 }
    checked { false }
    notificatable_id { 1 }
    notificatable_type { 'LikeIdea' }
  end
end
