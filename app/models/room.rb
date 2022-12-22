# == Schema Information
#
# Table name: rooms
#
#  id         :string(255)      not null, primary key
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  team_id    :bigint
#
class Room < ApplicationRecord
  has_many :messages, dependent: :destroy
  belongs_to :team, optional: true

  validates :team_id, presence: true

  before_create :set_uuid

  def set_uuid
    self.id = SecureRandom.uuid while id.blank? || User.find_by(id: id).present?
  end
end
