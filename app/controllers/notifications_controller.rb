class NotificationsController < ApplicationController
  def index
    notification_list = current_user.passive_notifications.includes(%i[visitor]).order(created_at: :desc)
    notification_list.where(checked: false).update_all(checked: true)
    @notifications = Kaminari.paginate_array(notification_list).page(params[:page])
  end
end
