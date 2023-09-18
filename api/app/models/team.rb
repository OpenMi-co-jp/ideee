# frozen_string_literal: true

# == Schema Information
#
# Table name: teams
#
#  id          :bigint           not null, primary key
#  members_num :integer          default(0)
#  offer       :string(255)      not null
#  requirement :string(255)      not null
#  status      :integer          default("active"), not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  idea_id     :bigint           not null
#  owner_id    :bigint           not null
#
# Indexes
#
#  index_teams_on_idea_id              (idea_id)
#  index_teams_on_owner_id             (owner_id)
#  index_teams_on_status_and_owner_id  (status,owner_id)
#
# Foreign Keys
#
#  fk_rails_...  (idea_id => ideas.id)
#  fk_rails_...  (owner_id => users.id)
#
class Team < ApplicationRecord
  validates :offer, presence: true
  validates :requirement, presence: true
  validates :status, presence: true
  validates :owner_id, presence: true

  belongs_to :owner, class_name: 'User'
  belongs_to :idea

  has_many :team_users, dependent: :destroy
  has_many :members, through: :team_users, source: :user
  has_one :room, dependent: :destroy

  enum status: { active: 0, stop: 1, finished: 2 }, _prefix: true
  alias user owner # owner?メソッドを使うために設定

  def self.ransackable_attributes(_auth_object = nil)
    %w[status members_num].map(&:to_s) + _ransackers.keys
  end

  def current_member
    team_users.preload(:user).where(left: false).map(&:user)
  end

  def member?(user)
    current_member.include?(user)
  end

  def joined?(user)
    member?(user) || user.own?(self)
  end
end
