class Idea < ApplicationRecord
  belongs_to :user
  has_rich_text :note

  def user
    return User.find_by(id: self.user_id)
  end
end
