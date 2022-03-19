class NotificationsController < ApplicationController
  def index
    notification_list = current_user.passive_notifications.includes(%i[visitor]).order(created_at: :desc)
    @notifications = Kaminari.paginate_array(notification_list).page(params[:page])
  end

  def check
    current_user.passive_notifications.includes(%i[visitor]).where(checked: false).update_all(checked: true)
  end
end
