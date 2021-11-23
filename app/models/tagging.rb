# == Schema Information
#
# Table name: taggings
#
#  id         :bigint           not null, primary key
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  idea_id    :bigint           not null
#  tag_id     :bigint           not null
#
# Indexes
#
#  index_taggings_on_idea_id             (idea_id)
#  index_taggings_on_idea_id_and_tag_id  (idea_id,tag_id) UNIQUE
#  index_taggings_on_tag_id              (tag_id)
#
# Foreign Keys
#
#  fk_rails_...  (idea_id => ideas.id)
#  fk_rails_...  (tag_id => tags.id)
#
class Tagging < ApplicationRecord
  belongs_to :idea
  belongs_to :tag

  validates :tag_id, uniqueness: { scope: :idea_id }
end
