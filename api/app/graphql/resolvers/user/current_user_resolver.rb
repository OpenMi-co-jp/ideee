# frozen_string_literal: true

module Resolvers
  class User::CurrentUserResolver < BaseResolver
    graphql_name 'GetCurrentUser'

    type Types::UserType, null: false

    def resolve()
      ::User.find(context[:current_user].id)
    end
  end
end
