# == Schema Information
#
# Table name: reactions
#
#  id                :bigint           not null, primary key
#  emoji             :text(65535)
#  reactionable_type :string(255)      not null
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#  reactionable_id   :bigint           not null
#  user_id           :bigint           not null
#
# Indexes
#
#  index_reactions_on_reactionable  (reactionable_type,reactionable_id)
#  index_reactions_on_user_id       (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (user_id => users.id)
#
class Reaction < ApplicationRecord
  belongs_to :user
  belongs_to :reactionable, polymorphic: true
end
