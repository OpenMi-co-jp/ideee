# frozen_string_literal: true

module CreateNotification
  extend ActiveSupport::Concern

  def create_notification_with_notificationable_type(item, type)
    Notification.find_or_create_by!(
      visitor: self,
      visited_id: item.user_id,
      idea: item.is_a?(Idea) ? item : item.idea,
      notificatable_type: type
    )
  end

  def create_notification_comment(idea, comment)
    user_ids = select_notify_commenters(idea)
    user_ids.each do |user_id|
      create_notification(idea:, visited_id: user_id, notificatable: comment)
    end
  end

  def create_notification(idea:, visited_id:, notificatable: '', notificatable_type: '', notificatable_id: '')
    notificatable_detail =
      if notificatable.present?
        { notificatable: }
      else
        { notificatable_type:, notificatable_id: }
      end

    active_notifications.create(
      visitor: self,
      visited_id:,
      idea:,
      **notificatable_detail
    )
  end

  private

  def select_notify_commenters(idea)
    # アイデア作成者も含めたuser_id取得
    user_ids = idea.comments.pluck(:user_id).push(idea.user_id).uniq
    user_ids.delete(id)
    user_ids
  end
end
