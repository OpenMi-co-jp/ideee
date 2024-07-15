# frozen_string_literal: true

class SendCommentEmailJob < ApplicationJob
  queue_as :high

  def perform(current_user, idea, description)
    return unless Rails.env.production?

    users = [idea.user].push(idea.comment_users.uniq).flatten
    users.delete(current_user)
    return if users.nil?

    SendEmail.new.comment(users, current_user, idea, description)
  end
end
