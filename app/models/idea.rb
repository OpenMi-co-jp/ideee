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
#  github_url                                               :string(255)
#  goal                                                     :string(255)
#  hypothesis                                               :string(255)
#  icon                                                     :string(255)
#  issue                                                    :string(255)
#  likes_num                                                :integer          default(0)
#  monetize                                                 :string(255)
#  name                                                     :string(255)
#  note                                                     :text(65535)
#  product_apply                                            :integer          default("no_apply")
#  product_url                                              :string(255)
#  published_at                                             :datetime
#  similar                                                  :string(255)
#  stance                                                   :integer          default("free_right")
#  target                                                   :string(255)
#  team_members_num                                         :integer          default(0)
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
  has_many :likes, dependent: :destroy, as: :likable
  has_many :users, through: :likes
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
  after_create :send_draft_remind
  after_commit :count_user_ideas # draftとideaを切り離したら作成と削除時に限定する

  validates :name, presence: true, length: { maximum: 50 }
  validates :background, presence: true, length: { maximum: 255 }
  validates :goal, presence: true, length: { maximum: 255 }
  validate :validate_tags_num
  validates :product_url, format: /\A#{URI::DEFAULT_PARSER.make_regexp(%w[http https])}\z/, allow_blank: true
  validates :github_url, format: /\A#{URI::DEFAULT_PARSER.make_regexp(%w[http https])}\z/, allow_blank: true

  enum difficulty: { not_yet: 0, easy: 1, middle: 2, hard: 3 }
  enum product_apply: { no_apply: 0, applying: 1, approved: 2 }
  enum stance: { free_right: 0, personal_project: 1, team_project: 2 }

  scope :published, -> { where draft: false }
  scope :drafts, -> { where draft: true }
  scope :most_liked, -> { preload(:idea_tags).order(likes_num: 'DESC') }
  scope :most_commented, -> { preload(:idea_tags).order(comments_num: 'DESC') }
  scope :recent_select, -> { where(published_at: 30.days.ago..Time.zone.now) }
  scope :not_emailed, -> { where(emailed_at: nil) }
  scope :deployed, -> { where product_apply: :approved }
  scope :tag_name_like, ->(tag_name) { joins(:idea_tags).where('tags.name like?', "%#{tag_name}%") }
  scope :pickup_user_nums, ->(num) { group_by(&:user_id).transform_values(&:size).max(num) { |x, y| x[1] <=> y[1] } }
  scope :others_ideas, ->(user_id) { preload(:idea_tags).where.not(user_id:).uniq }

  def published_time
    published_at&.strftime('%Y.%m.%d')
  end

  def created_time
    created_at.strftime('%Y.%m.%d')
  end

  def count_likes
    update_column(:likes_num, likes.size)
  end

  def count_comments
    update_column(:comments_num, comments.size)
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

  def validate_tags_num
    errors.add(:base, "タグは#{MAX_TAGS_COUNT}つまでしか入力できません") if idea_tags.length > MAX_TAGS_COUNT
  end

  def same_tag_ideas
    return [] if idea_tags.empty?

    Idea.published.where(idea_tags: { name: idea_tags.pluck(:name) }).where.not(id:).eager_load(%i[idea_tags taggings])
  end

  def same_user_other_ideas
    return [] if user.ideas_num == 1

    user.ideas.published.eager_load(:idea_tags).where.not(id:)
  end

  def send_draft_remind
    return unless Rails.env.production? || draft

    RemindDraftJob.set(wait: 1.week).perform_later(id)
  end

  def voted_percentage(level)
    counted_num = difficultys.count { |d| d.level == level }
    "#{(counted_num.to_f / difficultys.length * 100).round(1)} %"
  end

  def enough_view?
    view > 10
  end

  def count_team_members
    update(team_members_num: team.members.size)
  end

  def enough_team_member?
    team_project? && team_members_num.positive?
  end

  def count_user_ideas
    return unless Rails.env.production?

    CountUserIdeasJob.perform_later(user_id)
  end
end
