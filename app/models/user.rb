class User < ApplicationRecord
  # :lockable, :timeoutable
  devise :confirmable, :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable,
         :omniauthable, omniauth_providers: %i[twitter google_oauth2]
  has_many :ideas, dependent: :destroy

  enum definition: {
    idea_man: 0, engineer: 1, idea_engineer: 2
  }
  mount_uploader :icon, ImageUploader
  validates :email, presence: true, length: { maximum: 255 }, uniqueness: true

  def self.from_omniauth(auth)
    where(provider: auth.provider, uid: auth.uid).first_or_create! do |user|
      case auth.provider
      when 'google_oauth2'
        user.name = ""
      when 'twitter'
        user.name = auth.info.name
        user.description = auth.info.description
        user.twitter_id = auth.info.nickname
      end
      user.email = auth.info.email || ''
      user.password = Devise.friendly_token[0, 20]
      user.icon = auth.info.image
      user.confirmed_at = Time.now.utc
    end
  end

  def self.new_with_session(_, session)
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

  def email_required?
    provider == 'twitter' && !email.blank? && super
  end

  def defined?
    !email.blank? && !name.blank? && !confirmed_at.blank? && !definition.blank?
  end
end
