# frozen_string_literal: true

module Resolvers
  class User::UserNumResolver < BaseResolver
    graphql_name 'GetUserNum'

    type Integer, null: false

    def resolve
      ::User.count
    end
  end
end
