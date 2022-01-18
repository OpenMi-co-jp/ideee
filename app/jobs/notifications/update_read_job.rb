module Notifications
  class UpdateReadJob < ApplicationJob
    queue_as :default

    def perform(id)
      Notification.find(id).update!(checked: true)
    end
  end
end
