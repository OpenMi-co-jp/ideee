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
FactoryBot.define do
  factory :notification do
    visitor_id { 1 }
    visited_id { 1 }
    idea_id { 1 }
    comment_id { 1 }
    like_id { 1 }
    action { "MyString" }
    checked { false }
  end
end
