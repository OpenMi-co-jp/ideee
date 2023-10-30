# frozen_string_literal: true

module Resolvers
  class User::CurrentUserResolver < BaseResolver
    graphql_name 'GetCurrentUser'

    type Types::UserType, null: false

    def resolve
      context[:current_user] ? ::User.find_by(id: context[:current_user].id) : nil
    end
  end
end
