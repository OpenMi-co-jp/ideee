# frozen_string_literal: true

module Resolvers
  class User::UserCountResolver < BaseResolver
    graphql_name 'GetUserCount'

    type Integer, null: false

    def resolve
      ::User.count
    end
  end
end
