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
#  index_notifications_on_notificatable_id_and_notificatable_type  (notificatable_id,notificatable_type)
#
FactoryBot.define do
  factory :notification do
    visitor_id { 1 }
    visited_id { 1 }
    idea_id { 1 }
    action { 'like' } # 削除予定
    checked { false }
    notificatable_id { 1 }
    notificatable_type { 'Like' }
  end
end
