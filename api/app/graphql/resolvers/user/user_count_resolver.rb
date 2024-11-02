# frozen_string_literal: true

module Resolvers
  class User::UserCountResolver < BaseResolver
    graphql_name 'GetUserCount'

    type Integer, null: false

    def resolve
      Rails.cache.fetch('user_count', expires_in: 1.day) do
        ::User.count
      end
    end
  end
end
