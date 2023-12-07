# frozen_string_literal: true

class NotificationsController < ApplicationController
  before_action :authenticate_user!

  def check
    current_user.passive_notifications.where(checked: false).update_all(checked: true)
  end
end
