class SendCommentEmailJob < ApplicationJob
  queue_as :default

  def perform(idea, description)
    return unless Rails.env.production?

    users = [idea.user].push(idea.comment_users.uniq).flatten
    users.delete(self)
    return if users.nil?

    SendEmail.new.comment(users, self, idea, description)
  end
end
