module Slack
  class SendApplyJob < ApplicationJob
    queue_as :default

    def perform(item, url)
      SlackNotifier.new.apply_send(item, url)
    end
  end
end
