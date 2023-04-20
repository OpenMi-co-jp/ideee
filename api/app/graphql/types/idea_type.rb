# frozen_string_literal: true

module Types
  class IdeaType < Types::BaseObject
    field :id, ID, null: false
    field :name, String
    field :icon, String
    field :note, String
    field :view, Integer
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false
    field :user_id, Integer, null: false
    field :likes_num, Integer
    field :difficulty, Integer
    field :draft, Boolean
    field :comments_num, Integer
    field :product_url, String
    field :product_apply, Integer
    field :published_at, GraphQL::Types::ISO8601DateTime
    field :background, String
    field :goal, String
    field :issue, String
    field :wish_function, String
    field :hypothesis, String
    field :target, String
    field :similar, String
    field :emailed_at, GraphQL::Types::ISO8601DateTime
    field :github_url, String
    field :monetize, String
    field :stance, Integer

    field :user, Types::UserType, null: false
  end
end
