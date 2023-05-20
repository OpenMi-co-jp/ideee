# frozen_string_literal: true

module Resolvers
  class Notification::NotificationsResolver < BaseResolver
    graphql_name 'GetNotifications'

    type [Types::NotificationType], null: false

    def resolve
      ::Notification.all
    end
  end
end
