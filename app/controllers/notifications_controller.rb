class NotificationsController < ApplicationController
  def index
    notifications = current_user.passive_notifications.order(created_at: :desc)
    notifications.where(checked: false).update_all(checked: true)
    @notifications = Kaminari.paginate_array(notifications).page(params[:page])
  end
end
