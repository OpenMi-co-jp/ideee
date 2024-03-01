module Resolvers
  module NotificationConfig
    class NotificationConfigResolver < BaseResolver
      graphql_name 'GetNotificationConfig'

      type Types::NotificationConfigType, null: false

      argument :user_id, ID, required: true, description: 'ユーザーID'

      def resolve(**args)
        current_user.notification_config
      end
    end
  end
end
