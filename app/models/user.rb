# == Schema Information
#
# Table name: users
#
#  id                     :bigint           not null, primary key
#  confirmation_sent_at   :datetime
#  confirmation_token     :string(255)
#  confirmed_at           :datetime
#  defined                :boolean
#  definition             :integer
#  description            :string(200)
#  email                  :string(255)
#  encrypted_password     :string(255)      default(""), not null
#  icon                   :string(255)
#  name                   :string(30)       default("")
#  point                  :integer
#  provider               :string(255)
#  remember_created_at    :datetime
#  remote_url             :string(255)
#  reset_password_sent_at :datetime
#  reset_password_token   :string(255)
#  site_url               :string(255)
#  uid                    :string(255)
#  unconfirmed_email      :string(255)
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#  twitter_id             :string(255)
#
# Indexes
#
#  index_users_on_email                 (email) UNIQUE
#  index_users_on_reset_password_token  (reset_password_token) UNIQUE
#
class User < ApplicationRecord
  # :lockable, :timeoutable
  devise :confirmable, :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable,
         :omniauthable, omniauth_providers: %i[twitter google_oauth2]
  has_many :ideas, dependent: :destroy
  has_many :likes, dependent: :destroy
  has_many :like_ideas, through: :likes, source: :idea
  has_many :comments, dependent: :destroy
  has_many :comment_ideas, through: :comments, source: :idea
  has_many :difficultys, dependent: :destroy
  has_many :difficulty_ideas, through: :difficultys, source: :idea
  has_many :cooperations, dependent: :destroy
  has_many :cooperation_ideas, through: :cooperations, source: :idea

  enum definition: {
    idea_man: 0, engineer: 1, idea_engineer: 2
  }
  mount_uploader :icon, ImageUploader
  before_update :twitter_id_fix
  validates :email, presence: true, length: { maximum: 255 }, uniqueness: true
  validates :name, length: { maximum: 30 }
  validates :description, length: { maximum: 200 }
  validates :site_url, format: /\A#{URI::regexp(%w(http https))}\z/, allow_blank: true

  scope :defined_user, -> { where defined: true }

  class << self
    # omniauthを使ったSNSログイン機能
    def from_omniauth(auth)
      where(provider: auth.provider, uid: auth.uid).first_or_create! do |user|
        case auth.provider
        when 'google_oauth2'
          user.name = ""
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
    rescue
      # メールアドレスが既に登録されていたら登録された方法をエラーで表示
      raise "メールアドレス#{auth.info.email}のアカウントは#{ signin_how(auth.info.email) }で登録されています"
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
      case find_by(email: email).provider
      when nil
        'メール'
      when 'twitter'
        'Twitter'
      else
        'Google'
      end
    end

    def search(key)
      where(definition: key).or(where(definition: :idea_engineer))
    end
  end

  # twitterログインでもメールアドレスがあればメールアドレスを必須項目にする
  def email_required?
    provider == 'twitter' && !email.blank? && super
  end

  def check_defined?
    bool = name.present? && confirmed_at.present? && definition.present?
    update(defined: bool) # 名前、メール確認日時、タイプの有無を真偽値として保存
    return bool
  end

  # ユーザーに紐づいたobjectの所有者を判断
  def own?(object)
    id == object.user_id
  end

  def like(idea)
    likes.find_or_create_by(idea: idea)
    idea.count_likes
  end

  def like?(idea)
    like_ideas.include?(idea)
  end

  def unlike(idea)
    like_ideas.delete(idea)
    idea.count_likes
  end

  def voted?(idea)
    difficulty_ideas.include?(idea)
  end

  def create_comment(params)
    comments.create(idea_id: params[:idea_id], description: params[:description])
    Idea.find(params[:idea_id]).count_comments
  end

  def cooperation_joined?(idea)
    cooperation_ideas.include?(idea)
  end

  # Contributionの計算
  def point_update
    idea_num = ideas.length
    idea_like_num = ideas.sum{|n| n.likes.length }
    comment_point = comments.length
    like_num = likes.length
    sum_points = 2*idea_num + 0.5*like_num + idea_like_num + comment_point
    update(point: sum_points)
  end

  def twitter_id_fix
    self.twitter_id = twitter_id.gsub(/https:\/\/twitter.com\//, "") if twitter_id.present?
  end
end
