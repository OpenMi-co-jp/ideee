# frozen_string_literal: true

module Resolvers
  class User::UserIdsResolver < BaseResolver
    graphql_name 'GetUserIds'
    # ユーザーのIDリストを返すフィールドを定義
    type Types::User::UserIdsType, null: false

    def resolve
      { ids: ::User.ids }
    end
  end
end
