class UserMailer < ApplicationMailer
  include PublishMail

  def self.send_daily_announcements
    # 全ユーザーを取得
    user_ids = User.ids

    # Sendgridの無料枠が1日100人までなので分けて送信
    user_ids.each_slice(90).with_index do |ids, index|
      SendAnnouncementJob.set(wait_until: index.day.from_now).perform_later(ids)
    end
  end
end
