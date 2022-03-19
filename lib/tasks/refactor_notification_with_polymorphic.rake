namespace :refactor_notification_with_polymorphic do
  desc '既存のactionとlike_idとcomment_idを移行する'
  task transfer_notification_data: :environment do
    Notification.find_each do |notification|
      if notification.action == "like"
        like = Like.find_by!(idea_id: notification.idea_id, user_id: notification.visitor)
        notification.update!(notificatable: like)
      elsif notification.action == "comment"
        notification.update!(notificatable: notification.comment)
      end
    end
  end
end
