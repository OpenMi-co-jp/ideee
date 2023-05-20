# frozen_string_literal: true

module Resolvers
  class User::UserResolver < BaseResolver
    graphql_name 'GetUser'

    type Types::UserType, null: false

    argument :id, ID, required: true, description: 'ユーザー検索ID'

    def resolve(**args)
      ::User.find(args[:id])
    end
  end
end
