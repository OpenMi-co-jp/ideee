class SendCommentEmailJob < ApplicationJob
  queue_as :default

  def perform(current_user, idea, description)
    return unless Rails.env.production?

    commented_users = idea.comment_users.where.not(id: current_user.id).distinct
    return if commented_users.nil?

    SendEmail.new.comment(commented_users, current_user, idea, description)
  end
end
