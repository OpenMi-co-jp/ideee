# frozen_string_literal: true

module Resolvers
  class Notification::LatestNotificationsResolver < BaseResolver
    graphql_name 'GetLatestNotifications'

    type [Types::Notification::NotificationType], null: false

    def resolve
      current_user = context[:current_user]
      return [] unless current_user

      current_user.passive_notifications&.eager_load(%i[visitor idea])&.limit(5)
    end
  end
end
