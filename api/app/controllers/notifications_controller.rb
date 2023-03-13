# frozen_string_literal: true

class NotificationsController < ApplicationController
  before_action :authenticate_user!

  def index
    notification_list = current_user.passive_notifications.eager_load(%i[visitor idea]).order(created_at: :desc)
    @notifications = Kaminari.paginate_array(notification_list).page(params[:page])
  end

  def check
    current_user.passive_notifications.where(checked: false).update_all(checked: true)
  end
end
