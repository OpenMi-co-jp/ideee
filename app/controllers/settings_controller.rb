# frozen_string_literal: true

class SettingsController < ApplicationController
  before_action :authenticate_user!

  def index
    @notification_config = NotificationConfig.find_by(user: current_user)
  end

  def notification_config
    @notification_config = NotificationConfig.find_by(user: current_user)
    permitted_params =
      params.require(:notification_config)
            .permit(:comment_email, :draft_remind_email, :event_email, :heart_email, :team_join_email, :team_message_email, :weekly_email)
    @notification_config.update!(permitted_params)
    redirect_to user_url(current_user), notice: t('.success')
  end
end
