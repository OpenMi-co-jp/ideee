class Idea < ApplicationRecord
  belongs_to :user
  has_many :likes, dependent: :destroy
  has_many :users, through: :likes
  has_many :like_users, through: :likes, source: :user
  has_many :comments, dependent: :destroy
  has_many :comment_users, through: :comments, source: :user
  has_many :difficultys, dependent: :destroy
  has_many :difficulty_users, through: :difficultys, source: :user
  has_rich_text :note
  mount_uploader :icon, ImageUploader

  validates :name, presence: true, length: { maximum: 50 }
  validates :note, presence: true

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

  def difficulty
    return '不明' if difficultys.empty?
    difficultys.group(:level).count.max { |x, y| x[1] <=> y[1] }[0]
  end
end
