module Notifications
  class SendHeartMail < ApplicationJob
    queue_as :default

    def perform(user_id, notifications)
      email_to = User.find_by_id(user_id)&.email
      action_users = User.where(id: notifications.map(&:visitor_id))
      # notificationのsend_atに送信日時を設定
      notifications.update_all(send_at: Time.now)

      SendEmail.new.likes(email_to, notifications, action_users)
    end
  end
end
