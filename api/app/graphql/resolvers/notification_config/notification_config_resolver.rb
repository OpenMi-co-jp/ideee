module Resolvers
  module NotificationConfig
    class NotificationConfigResolver < BaseResolver
      graphql_name 'GetNotificationConfig'

      type Types::NotificationConfigType, null: false

      def resolve
        ::NotificationConfig.find_by(user_id: context[:current_user].id)
      end
    end
  end
end
