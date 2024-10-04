# frozen_string_literal: true

module Types
  class TeamType < Types::BaseObject
    field :id, ID, null: false, description: 'チームID'
    field :owner_id, Integer, null: false, description: 'オーナーID'
    field :idea_id, Integer, null: false, description: 'アイデアID'
    field :status, String, null: false, description: 'チームステータス'
    field :requirement, String, null: false, description: 'お願いすること'
    field :offer, String, null: false, description: '(メンバーが)得られるもの'
    field :members_num, Integer, description: 'メンバー数'
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false, description: '作成日'

    field :owner, Types::UserType, null: false, description: 'オーナー'
    field :idea, Types::Idea::IdeaType, null: false, description: 'アイデア'
    field :current_member, [Types::UserType], null: true, description: 'メンバー'
  end
end
