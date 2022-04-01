# == Schema Information
#
# Table name: ideas
#
#  id                                                       :bigint           not null, primary key
#  background                                               :string(255)
#  comments_num                                             :integer          default(0)
#  difficulty                                               :integer          default("not_yet")
#  draft                                                    :boolean          default(FALSE)
#  emailed_at(weeklyメールで新規アイデアとして送られた日時) :datetime
#  goal                                                     :string(255)
#  hypothesis                                               :string(255)
#  icon                                                     :string(255)
#  issue                                                    :string(255)
#  likes_num                                                :integer          default(0)
#  name                                                     :string(255)
#  note                                                     :text(65535)
#  product_apply                                            :integer          default("no_apply")
#  product_url                                              :string(255)
#  published_at                                             :datetime
#  similar                                                  :string(255)
#  target                                                   :string(255)
#  view                                                     :integer          default(0)
#  wish_function                                            :string(255)
#  created_at                                               :datetime         not null
#  updated_at                                               :datetime         not null
#  user_id                                                  :bigint           not null
#
# Indexes
#
#  index_ideas_on_user_id  (user_id)
#
class Idea < ApplicationRecord
  MAX_TAGS_COUNT = 3

  belongs_to :user
  has_many :likes, dependent: :destroy
  has_many :users, through: :likes
  has_many :like_users, through: :likes, source: :user
  has_many :comments, dependent: :destroy
  has_many :comment_users, through: :comments, source: :user
  has_many :taggings, dependent: :destroy
  has_many :idea_tags, through: :taggings, source: :tag
  has_many :difficultys, dependent: :destroy
  has_many :difficulty_users, through: :difficultys, source: :user
  has_many :notifications, dependent: :destroy
  has_one :team, dependent: :destroy
  has_rich_text :note
  mount_uploader :icon, ImageUploader

  validates :name, presence: true, length: { maximum: 50 }
  validates :background, presence: true
  validates :goal, presence: true
  validate :validate_tags_num
  validates :product_url, format: /\A#{URI::DEFAULT_PARSER.make_regexp(%w[http https])}\z/, allow_blank: true

  enum difficulty: { not_yet: 0, easy: 1, middle: 2, hard: 3 }
  enum product_apply: { no_apply: 0, applying: 1, approved: 2 }

  scope :with_tag, ->(tag_name) { joins(:idea_tags).where(idea_tags: { name: tag_name }) }
  scope :published, -> { where draft: false }
  scope :drafts, -> { where draft: true }
  scope :most_liked, -> { includes([:idea_tags]).order(likes_num: 'DESC').first(5) }
  scope :most_commented, -> { includes([:idea_tags]).order(comments_num: 'DESC') }
  scope :recent_select, -> { where(published_at: 30.days.ago..Time.now) }
  scope :not_emailed, -> { where(emailed_at: nil) }
  scope :deployed, -> { where product_apply: :approved }
  scope :tag_name_like, ->(tag_name) { joins(:idea_tags).where('tags.name like?', "%#{tag_name}%") }
  scope :pickup_user_nums, ->(num) { group_by(&:user_id).transform_values(&:size).max(num) { |x, y| x[1] <=> y[1] } }

  def published_time
    published_at&.strftime('%Y.%m.%d')
  end

  def created_time
    created_at.strftime('%Y.%m.%d')
  end

  def self.search(name: nil, difficulty: nil, product_apply: nil)
    # TODO: クソコードをリファクタ
    if name.nil? && difficulty.nil? && product_apply.nil?
      published
    elsif name.present?
      where(['name like?', "%#{name}%"])
    elsif difficulty.present?
      where(difficulty: difficulty)
    elsif product_apply.present?
      where(product_apply: product_apply)
    end
  end

  def count_likes
    update(likes_num: like_users.size)
  end

  def count_comments
    self.comments_num = comments.size
    save!
  end

  def save_with_tags(tag_list)
    if tag_list.nil?
      save!
      return true
    end
    ActiveRecord::Base.transaction do
      self.idea_tags = tag_list.map { |name| Tag.find_or_initialize_by(name: name.strip) }
      save!
    end
    true
  rescue StandardError
    false
  end

  def tag_list
    idea_tags.pluck(:name).join(',')
  end

  def update_difficulty
    # difficultyが一つしかなければ現在の値を代入
    level = if difficultys.size == 1
              difficultys[0].level
            else
              # 2つ以上であればgroup化して計算開始
              levels_hash = difficultys.group(:level).size
              if levels_hash.map { |n| n[1] }.max(2).uniq.length == 1
                # もし最も多く使われる値が2つ以上ある場合
                'middle'
              else
                # 最も多く使われる値が１つしかない場合
                levels_hash.max_by { |x| x[1] }[0]
              end
            end
    # ideaを出力されたlevelでupdate
    update(difficulty: level)
  end

  def validate_tags_num
    errors.add(:base, "タグは#{MAX_TAGS_COUNT}つまでしか入力できません") if idea_tags.length > MAX_TAGS_COUNT
  end

  def create_notification_like(current_user, like)
    create_notification(current_user, user_id, like)
  end

  def create_notification_comment(current_user, comment)
    user_ids = select_notify_commenter(current_user)
    user_ids.each do |user_id|
      create_notification(current_user, user_id, comment)
    end
  end

  def create_notification_difficulty(current_user, difficulty)
    create_notification(current_user, user_id, difficulty)
  end

  def create_notification_product_apply
    admin_user = User.first
    notification = create_notification(admin_user, user_id, nil)
    notification.update_column(:notificatable_type, 'product_apply')
  end

  def select_notify_commenter(current_user)
    # アイデア作成者も含めたuser_id取得
    user_ids = comments.pluck(:user_id).push(user_id).uniq
    user_ids.delete(current_user.id)
    user_ids
  end

  def create_notification(current_user, visited_id, notificatable)
    current_user.active_notifications.find_or_create_by!(
      visitor: current_user,
      visited_id: visited_id,
      idea: self,
      notificatable: notificatable
    )
  end
end
