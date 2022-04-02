# == Schema Information
#
# Table name: team_users
#
#  id         :bigint           not null, primary key
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  team_id    :bigint
#  user_id    :bigint
#
# Indexes
#
#  index_team_users_on_team_id              (team_id)
#  index_team_users_on_user_id              (user_id)
#  index_team_users_on_user_id_and_team_id  (user_id,team_id) UNIQUE
#
class TeamUser < ApplicationRecord
  belongs_to :user
  belongs_to :team
end
