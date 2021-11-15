# == Schema Information
#
# Table name: ideas
#
#  id           :bigint           not null, primary key
#  comments_num :integer          default(0)
#  difficulty   :integer          default("not_yet")
#  icon         :string(255)
#  likes_num    :integer          default(0)
#  name         :string(255)
#  note         :text(65535)
#  view         :integer
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  user_id      :bigint           not null
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
  has_many :difficultys, dependent: :destroy
  has_many :difficulty_users, through: :difficultys, source: :user
  has_rich_text :note
  mount_uploader :icon, ImageUploader

  validates :name, presence: true, length: { maximum: 50 }
  validates :note, presence: true
  enum difficulty: { not_yet: 0, easy: 1, middle: 2, hard: 3 }

  scope :published, -> { where draft: false }
  scope :drafts, -> { where draft: true }
  scope :most_commented, -> { order(comments_num: "DESC") }

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

  def self.search(name: nil, difficulty: nil)
    # TODO: クソコードをリファクタ
    if name.nil? && difficulty.nil?
      all.published
    elsif !name.nil?
      where(["name like?", "%#{name}%"]).published
    else !difficulty.nil?
      where(difficulty: difficulty).published
    end
  end

  def count_likes
    update(likes_num: like_users.count )
  end

  def count_comments
    update(comments_num: comments.count)
  end

  def update_difficulty
    # difficultyが一つしかなければ現在の値を代入
    level = if difficultys.count == 1
              difficultys[0].level
            else
              # 2つ以上であればgroup化して計算開始
              levels_hash = difficultys.group(:level).count
              if levels_hash.map{ |n| n[1] }.max(2).uniq.length == 1
                # もし最も多く使われる値が2つ以上ある場合
                'middle'
              else
                # 最も多く使われる値が１つしかない場合
                levels_hash.max_by{|x| x[1]}[0]
              end
            end
    # ideaを出力されたlevelでupdate
    update(difficulty: level)
  end
end
