# frozen_string_literal: true

# == Schema Information
#
# Table name: rooms
#
#  id         :string(255)      not null, primary key
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  team_id    :bigint
#
FactoryBot.define do
  factory :room do
    team
  end
end
