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
FactoryBot.define do
  factory :team do
  end
end
