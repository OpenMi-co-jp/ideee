# frozen_string_literal: true

class NotificationMessageJob < ApplicationJob
  queue_as :high

  def perform(message)
    return unless Rails.env.production?

    team = message.room.team
    return if team.current_member.nil?

    sender = message.user
    team_members = [team.owner].push(team.current_member).flatten
    team_members.delete(sender)

    SendEmail.new.notification_message(team_members, sender, message)
  end
end
