module Notifications
  class UpdateDifficultyJob < ApplicationJob
    queue_as :default

    def perform(current_user, difficulty)
      difficulty.idea.create_notification_difficulty(current_user, difficulty)
    end
  end
end
