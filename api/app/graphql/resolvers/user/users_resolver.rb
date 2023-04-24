# frozen_string_literal: true

module Resolvers
  class User::UsersResolver < BaseResolver
    graphql_name 'GetUsers'

    type [Types::UserType], null: false

    def resolve
      ::User.all
    end
  end
end
