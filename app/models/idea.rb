class Idea < ApplicationRecord
  belongs_to :user
  has_many :likes, dependent: :destroy
  has_many :users, through: :likes
  has_many :like_users, through: :likes, source: :user
  has_rich_text :note
  mount_uploader :icon, ImageUploader

  validates :name, presence: true, length: { maximum: 120 }
  validates :note, presence: true

  def user
    return User.find_by(id: self.user_id)
  end

  def created_time
    created_at.strftime("%Y.%m.%d")
  end

  def views_update(id)
    idea_view = Analytics.new.report_count('pageviews', id)
    update(view: idea_view)
  end
end
