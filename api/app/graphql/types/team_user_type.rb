module Types
  class TeamUserType < Types::BaseObject
    field :team_id, Integer, description: 'チームID'
    field :user_id, Integer, description: 'ユーザーID'
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false, description: '作成日'
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false, description: '更新日'
  end
end