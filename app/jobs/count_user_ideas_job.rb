class CountUserIdeasJob < ApplicationJob
  queue_as :default

  def perform(id)
    user = User.find(id)
    return if user.nil?

    user.update_attribute(:ideas_num, user.ideas.published.size)
  end
end
