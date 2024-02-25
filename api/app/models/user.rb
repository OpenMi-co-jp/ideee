# frozen_string_literal: true

# == Schema Information
#
# Table name: users
#
#  id                                        :bigint           not null, primary key
#  allow_password_change(パスワード変更許可) :boolean          default(FALSE), not null
#  confirmation_sent_at                      :datetime
#  confirmation_token                        :string(255)
#  confirmed_at                              :datetime
#  current_sign_in_at                        :datetime
#  current_sign_in_ip                        :string(255)
#  defined                                   :boolean
#  definition                                :integer
#  description                               :string(200)
#  email                                     :string(255)
#  encrypted_password                        :string(255)      default(""), not null
#  icon                                      :string(255)
#  ideas_num                                 :integer          default(0)
#  last_sign_in_at                           :datetime
#  last_sign_in_ip                           :string(255)
#  name                                      :string(30)       default("")
#  point                                     :integer          default(0)
#  provider                                  :string(255)      default("email"), not null
#  remember_created_at                       :datetime
#  remote_url                                :string(255)
#  reset_password_sent_at                    :datetime
#  reset_password_token                      :string(255)
#  sign_in_count                             :integer          default(0), not null
#  site_url                                  :string(255)
#  tokens(認証用トークン)                    :json
#  uid                                       :string(255)      default(""), not null
#  unconfirmed_email                         :string(255)
#  created_at                                :datetime         not null
#  updated_at                                :datetime         not null
#  github_id                                 :string(255)
#  twitter_id                                :string(255)
#
# Indexes
#
#  index_users_on_email                 (email) UNIQUE
#  index_users_on_reset_password_token  (reset_password_token) UNIQUE
#
class User < ApplicationRecord
  extend Devise::Models
  # エラー対処のため二重記述
  devise :confirmable, :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, :trackable,
         :omniauthable, omniauth_providers: %i[twitter google_oauth2]
  has_many :ideas, dependent: :destroy
  has_many :likes, dependent: :destroy
  has_many :comments, dependent: :destroy
  has_many :comment_ideas, through: :comments, source: :idea
  has_many :difficultys, dependent: :destroy
  has_many :difficulty_ideas, through: :difficultys, source: :idea
  has_many :active_notifications, class_name: 'Notification', foreign_key: 'visitor_id', dependent: :destroy
  has_many :passive_notifications, class_name: 'Notification', foreign_key: 'visited_id', dependent: :destroy

  # settings relation
  has_one :notification_config, dependent: :destroy

  before_save :fix_ids
  after_create :create_notification_config
  after_create :update_access_token!

  enum definition: {
    idea_man: 0, engineer: 1, idea_engineer: 2
  }
  mount_base64_uploader :icon, ImageUploader
  validates :email, presence: true, length: { maximum: 255 }, uniqueness: true
  validates :name, length: { maximum: 30 }
  validates :description, length: { maximum: 200 }
  validates :site_url, format: /\A#{URI::DEFAULT_PARSER.make_regexp(%w[http https])}\z/, allow_blank: true

  scope :defined_user, -> { where defined: true }

  # emailの送信設定
  delegate :comment_email, to: :notification_config
  delegate :draft_remind_email, to: :notification_config
  delegate :team_join_email, to: :notification_config
  delegate :team_leave_email, to: :notification_config
  delegate :team_message_email, to: :notification_config
  scope :event_emailable, -> { joins(:notification_config).where(notification_configs: { event_email: true }) }
  scope :heart_emailable, -> { joins(:notification_config).where(notification_configs: { heart_email: true }) }
  scope :weekly_emailable, -> { joins(:notification_config).where(notification_configs: { weekly_email: true }) }

  # 通知を作成する
  include CreateNotification

  class << self
    # omniauthを使ったSNSログイン機能
    def from_omniauth(auth)
      where(provider: auth.provider, uid: auth.uid).first_or_create! do |user|
        case auth.provider
        when 'google_oauth2'
          user.name = auth.info.name
        when 'twitter'
          user.name = auth.info.name
          user.description = auth.info.description
          user.twitter_id = auth.info.nickname
          user.site_url = auth.info.urls['Website']
        end
        user.email = auth.info.email || ''
        user.password = Devise.friendly_token[0, 20]
        user.remote_url = auth.info.image
        user.confirmed_at = Time.now.utc
      end
    rescue StandardError
      # メールアドレスが既に登録されていたら登録された方法をエラーで表示
      raise "メールアドレス#{auth.info.email}のアカウントは#{signin_how(auth.info.email)}で登録されています"
    end

    def new_with_session(_, session)
      super.tap do |user|
        if (data = session['devise.omniauth_data'])
          user.email = data['email'] if user.email.blank?
          user.name = data['name'] if user.name.blank?
          user.twitter_id = data['twitter_uid'] if data['twitter_uid'] && user.twitter_uid.blank?
          # メールアドレスが渡されたときにメールアドレスの確認をスキップする
          user.skip_confirmation! if data['email'].present?
        end
      end
    end

    def signin_how(email)
      case find_by!(email:).provider
      when nil
        'メール'
      when 'twitter'
        'Twitter'
      else
        'Google'
      end
    end

    def ransackable_attributes(_auth_object = nil)
      %w[name email definition created_at ideas_num point].map(&:to_s) + _ransackers.keys
    end
  end

  def generate_jwt_token
    payload = {
      id: self.id,
      name: self.name,
      image: self.image,
      defined: self.defined,
      exp: Time.now.to_i + 1.week.to_i
    }

    secret_key = Rails.application.credentials.secret_key_base

    token = JWT.encode(payload, secret_key, 'HS256')
    "Bearer #{token}"
  end

  # cookieを使ってログインを保持
  def remember_me
    true
  end

  # ユーザーに紐づいたobjectの所有者を判断
  def own?(object)
    id == object.user.id
  end

  def like?(item)
    likes.preload(:likable).map(&:likable).include?(item)
  end

  def voted?(idea)
    difficulty_ideas.include?(idea)
  end

  def create_comment(params)
    comment_params = { idea_id: params[:idea_id], description: params[:description] }
    return if comments.find_by(comment_params).present?

    comments.create!(comment_params)
  end

  # Contributionの計算
  def point_update
    idea_num = ideas.length
    idea_like_num = ideas.sum { |n| n.likes.length }
    comment_point = comments.length
    like_num = likes.length
    sum_points = (idea_num * 2) + (like_num * 0.5) + idea_like_num + comment_point
    update_column(:point, sum_points)
  end

  def fix_ids
    self.twitter_id = twitter_id.gsub(%r{https://twitter.com/|@}, '') if twitter_id.present?
    self.github_id = github_id.gsub(%r{https://github.com/}, '') if github_id.present?
  end

  def image
    # urlメソッドを上書きしたので file.present? でファイルの有無を確認する
    self.icon.file.present? ? self.icon&.url : self.remote_url
  end

  private

  def create_notification_config
    NotificationConfig.create!(user: self)
  end

  def update_access_token!
    self.tokens = "#{self.id}:#{Devise.friendly_token}"
    save!
  end

  def notification_config
    notification_config
  end

  def update_notification_config(params)
    notification_config.update(params)
  end
end
