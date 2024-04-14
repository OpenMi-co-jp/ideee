# frozen_string_literal: true

module Resolvers
  class Notification::NotificationsResolver < BaseResolver
    graphql_name 'GetNotifications'
    include Resolvers::Concerns::Pagination

    type Types::Notification::NotificationsType, null: false

    def resolve(**args)
      current_user = context[:current_user]
      notification_list = current_user.passive_notifications.eager_load(%i[visitor idea]).order(created_at: :desc)
      to_paged_result(Kaminari.paginate_array(notification_list).page(args[:page]).per(args[:per]))
    end
  end
end
