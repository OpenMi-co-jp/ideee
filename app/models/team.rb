# == Schema Information
#
# Table name: teams
#
#  id          :bigint           not null, primary key
#  offer       :string(255)      not null
#  requirement :string(255)      not null
#  status      :integer          default("active"), not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  idea_id     :bigint           not null
#  owner_id    :integer          not null
#
# Indexes
#
#  index_teams_on_idea_id              (idea_id)
#  index_teams_on_status_and_owner_id  (status,owner_id)
#
# Foreign Keys
#
#  fk_rails_...  (idea_id => ideas.id)
#
class Team < ApplicationRecord
  validates :offer, presence: true
  validates :requirement, presence: true
  validates :status, presence: true
  belongs_to :owner, class_name: 'User', foreign_key: 'owner_id'
  belongs_to :idea
  has_many :team_users, dependent: :destroy
  has_many :members, through: :team_users, source: :user

  enum status: %i[active stop finished], _prefix: true
end
