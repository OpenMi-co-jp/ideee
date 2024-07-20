class SendAnnouncementJob < ApplicationJob
  queue_as :default

  def perform(user_ids)
    user_ids.each do |user_id|
      user = User.find_by(id: user_id)
      ::UserMailer.send_ai_feature_announcement(user).deliver_later if user
    end
  end
end
