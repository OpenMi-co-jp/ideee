class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, :trackable,
         :omniauthable, omniauth_providers: %i[twitter google_oauth2]
  has_many :ideas, dependent: :destroy

  enum type: {
    idea_man: 0, engineer: 1, idea_engineer: 2
  }

  def self.from_omniauth(auth)
    where(provider: auth.provider, uid: auth.uid).first_or_create do |user|
      case auth.provider
      when 'google_oauth2'
        user.name = ""
      when 'twitter'
        user.name = auth.info.name
        user.description = auth.info.description
        user.twitter_id = auth.info.nickname
      end
      user.email = auth.info.email || auth.info.unverified_email
      user.password = Devise.friendly_token[0, 20]
      user.icon = auth.info.image
    end
  end
end
