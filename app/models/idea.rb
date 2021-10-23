# == Schema Information
#
# Table name: ideas
#
#  id         :bigint           not null, primary key
#  icon       :string(255)
#  likes_num  :integer          default(0)
#  name       :string(255)
#  note       :text(65535)
#  view       :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  user_id    :bigint           not null
#
# Indexes
#
#  index_ideas_on_user_id  (user_id)
#
class Idea < ApplicationRecord
  belongs_to :user
  has_many :likes, dependent: :destroy
  has_many :users, through: :likes
  has_many :like_users, through: :likes, source: :user
  has_many :comments, dependent: :destroy
  has_many :comment_users, through: :comments, source: :user
  has_many :taggings, dependent: :destroy
  has_many :idea_tags, through: :taggings, source: :tag
  has_rich_text :note
  mount_uploader :icon, ImageUploader

  validates :name, presence: true, length: { maximum: 50 }
  validates :note, presence: true

  scope :with_tag, ->(tag_name) { joins(:idea_tags).where(idea_tags: { name: tag_name }) }

  def user
    return User.find_by(id: self.user_id)
  end

  def created_time
    created_at.strftime("%Y.%m.%d")
  end

  def views_update(id)
    idea_view = Analytics.new.report_count('pageviews', id)
    update(view: idea_view.to_i)
  end

  def self.search(keyword)
    where(["name like?", "%#{keyword}%"])
  end

  def count_likes
    update(likes_num: like_users.count )
  end

  def save_with_tags(tag_names:)
    ActiveRecord::Base.transaction do
      self.idea_tags = tag_names.map { |name| Tag.find_or_initialize_by(name: name.strip) }
      save!
    end
    true

    rescue StandardError
    false
  end

  def tag_names
    idea_tags.map(&:name).join(',')
  end
end
