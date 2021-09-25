class User < ApplicationRecord
  # :lockable, :timeoutable
  devise :confirmable, :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable,
         :omniauthable, omniauth_providers: %i[twitter google_oauth2]
  has_many :ideas, dependent: :destroy
  has_many :likes, dependent: :destroy
  has_many :like_ideas, through: :likes, source: :idea
  has_many :comments, dependent: :destroy

  enum definition: {
    idea_man: 0, engineer: 1, idea_engineer: 2
  }
  mount_uploader :icon, ImageUploader
  validates :email, presence: true, length: { maximum: 255 }, uniqueness: true

  class << self
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
      raise "メールアドレス#{auth.info.email}のアカウントは#{ signin_how(auth.info.email) }で登録されています"
    end

    def new_with_session(_, session)
      super.tap do |user|
        if (data = session['devise.omniauth_data'])
          user.email = data['email'] if user.email.blank?
          user.name = data['name'] if user.name.blank?
          user.twitter_id = data['twitter_uid'] if data['twitter_uid'] && user.twitter_uid.blank?
          # when to set up the confirmable
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
  end

  def email_required?
    provider == 'twitter' && !email.blank? && super
  end

  def undefined?
    name.blank? || confirmed_at.blank? || definition.blank?
  end

  def own?(object)
    id == object.user_id
  end

  def like(idea)
    likes.find_or_create_by(idea: idea)
  end

  def like?(idea)
    like_ideas.include?(idea)
  end

  def unlike(idea)
    like_ideas.delete(idea)
  end

  def create_comment(param)
    comments.create(idea_id: param[:idea_id], description: param[:description])
  end

  # def delete_comment(idea)
  #   comment_ideas.delete(idea)
  # end

  def point_update
    idea_num = ideas.length
    idea_like_num = ideas.sum{|n| n.likes.length }
    like_num = likes.length
    sum_points = 2*idea_num + 0.5*like_num + idea_like_num
    update(point: sum_points)
  end
end
