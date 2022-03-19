namespace :refactor_notification_with_polymorphic do
  desc '既存のactionとlike_idとcomment_idを移行する'
  task transfer_notification_data: :environment do
    Notification.find_each do |notification|
      if notification.like_id.present?
        notification.update!(notificatable: notification.like)
      elsif notification.comment_id.present?
        notification.update!(notificatable: notification.comment)
      end
    end
  end
end
