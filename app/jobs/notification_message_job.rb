class NotificationMessageJob < ApplicationJob
  queue_as :default

  def perform(message)
    # 本番環境以外はreturn
    # return unless Rails.env.production?
    team_members = message.room.team.members.where.not(id: message.user_id)


    return if team_members.nil?

    SendEmail.new.comment(team_members, message.user, message.room, message.content)
  end
end


# messages_controller内でmessageをcreateするのと同時にjobを呼び出す。
