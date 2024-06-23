# == Schema Information
#
# Table name: ai_logs
#
#  id         :bigint           not null, primary key
#  action     :string(255)      not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  user_id    :bigint           not null
#
# Indexes
#
#  index_ai_logs_on_user_id  (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (user_id => users.id)
#
class AiLog < ApplicationRecord
  belongs_to :user
  validates :action, presence: true
  enum action: { review: 'review' }
end
