module Notifications
  class UpdateDifficultyJob < ApplicationJob
    queue_as :default

    def perform(current_user, difficulty)
      current_user.create_notification_difficulty(difficulty)
    end
  end
end
