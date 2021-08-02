class Idea < ApplicationRecord
  belongs_to :user
  has_rich_text :note
  mount_uploader :icon, ImageUploader

  def user
    return User.find_by(id: self.user_id)
  end

  def created_time
    created_at.strftime("%Y.%m.%d")
  end
end
