namespace :send_heart_mail do
  desc 'ハートが送られたアイデアに対してメールを送る'
  task heart_remind: :environment do
    # まだメールが送られていないLikeタイプのnotificationをピックアップ
    notifications = Notification.not_sent_likes
    # 受け取り手のユーザーidを取得
    users_ids = notifications.pluck(:visited_id).uniq
    return if users_ids.nil?

    users_ids.each do |user_id|
      target_notifications = notifications.where(visited_id: user_id)
      Notifications::SendHeartMail.perform_later(user_id, target_notifications)
    end
  end
end
