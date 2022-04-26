module CreateNotification
  extend ActiveSupport::Concern

  def create_notification_like(item, like)
    Notification.find_or_create_by!(
      visitor: self,
      visited_id: item.user_id,
      idea: item.is_a?(Idea) ? item : item.idea,
      notificatable_type: "Like#{like.likable_type}"
    )
  end

  def create_notification_comment(idea, comment)
    user_ids = select_notify_commenters(idea)
    user_ids.each do |user_id|
      create_notification(idea, user_id, comment)
    end
  end

  def create_notification_difficulty(difficulty)
    create_notification(difficulty.idea, difficulty.idea.user_id, difficulty)
  end

  def create_notification_product_apply(idea)
    Notification.find_or_create_by!(
      visitor: self,
      visited_id: idea.user_id,
      idea: idea,
      notificatable_type: 'product_apply'
    )
  end

  def create_notification_team(idea, team_user)
    create_notification(idea, idea.user_id, team_user)
  end

  private

  def create_notification(idea, visited_id, notificatable)
    active_notifications.find_or_create_by!(
      visitor: self,
      visited_id: visited_id,
      idea: idea,
      notificatable: notificatable
    )
  end

  def select_notify_commenters(idea)
    # アイデア作成者も含めたuser_id取得
    user_ids = comments.pluck(:user_id).push(idea.user_id).uniq
    user_ids.delete(id)
    user_ids
  end
end
