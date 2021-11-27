# == Schema Information
#
# Table name: tags
#
#  id         :bigint           not null, primary key
#  name       :string(255)      not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
# Indexes
#
#  index_tags_on_name  (name) UNIQUE
#
class Tag < ApplicationRecord
  has_many :taggings, dependent: :destroy
  has_many :tagged_ideas, through: :taggings, source: :idea

  validates :name, presence: true, uniqueness: true
end
