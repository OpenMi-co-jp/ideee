class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  has_many :ideas, dependent: :destroy

  enum type: {
    idea_man: 0, engineer: 1, idea_engineer: 2
  }
end
