module Resolvers
  module NotificationConfig
    class NotificationConfigResolver < BaseResolver
      graphql_name 'GetNotificationConfig'

      type Types::NotificationConfigType, null: false

      argument :user_id, ID, required: true, description: 'ユーザーID'

      def resolve(**args)
        ::NotificationConfig.find_by(args[:user_id])
      end
    end
  end
end
