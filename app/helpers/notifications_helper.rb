module NotificationsHelper
  def notification_text(notification)
    if notification.action_like?
      notification_like_text(notification)
    elsif notification.action_comment?
      notification_comment_text(notification)
    end
  end

  def notification_like_text(notification)
    "#{notification.visitor.name}さんがあなたの投稿にいいねしました。"
  end

  def notification_comment_text(notification)
    "#{notification.visitor.name}さんがあなたの投稿にコメントしました。"
  end
end
