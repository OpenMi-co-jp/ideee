# frozen_string_literal: true

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

  scope :recent_tags, -> { where created_at: 4.months.ago..Time.zone.now }
  scope :popular_tags, lambda {
                         preload(:tagged_ideas).max(10) do |x, y|
                           x.tagged_ideas.length <=> y.tagged_ideas.length
                         end
                       }
end
