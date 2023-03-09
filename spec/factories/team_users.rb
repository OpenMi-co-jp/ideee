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
FactoryBot.define do
  factory :team_user do
    team
    user
  end
end
