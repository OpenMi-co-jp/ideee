class NotificationsController < ApplicationController
  def index
    @notifications = Kaminari.paginate_array(current_user.passive_notifications.order(created_at: :desc)).page(params[:page])
  end
end
