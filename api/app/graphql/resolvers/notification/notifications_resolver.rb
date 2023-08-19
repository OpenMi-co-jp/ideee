# frozen_string_literal: true

module Resolvers
  class Notification::NotificationsResolver < BaseResolver
    graphql_name 'GetNotifications'

    type [Types::NotificationType], null: false

    def resolve
      notification_list = current_user.passive_notifications.eager_load(%i[visitor idea]).order(created_at: :desc)
      Kaminari.paginate_array(notification_list).page(params[:page])
    end
  end
end
