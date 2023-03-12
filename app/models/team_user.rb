# frozen_string_literal: true

# == Schema Information
#
# Table name: team_users
#
#  id         :bigint           not null, primary key
#  leave      :boolean          default(FALSE), not null
#  left       :boolean          default(FALSE), not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  team_id    :bigint
#  user_id    :bigint
#
# Indexes
#
#  index_team_users_on_team_id  (team_id)
#  index_team_users_on_user_id  (user_id)
#
class TeamUser < ApplicationRecord
  belongs_to :user
  belongs_to :team
  has_many :notifications, dependent: :destroy, as: :notificatable
  counter_culture :team, column_name: 'members_num'
end
