module Notifications
  class UpdateDifficultyJob < ApplicationJob
    queue_as :default

    def perform(current_user, difficulty)
      current_user.create_notification(
        idea: difficulty.idea, visited_id: difficulty.idea.user_id,
        notificatable: difficulty
      )
    end
  end
end
