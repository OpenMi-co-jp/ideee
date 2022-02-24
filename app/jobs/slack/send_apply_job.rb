module Slack
  class SendApplyJob < ApplicationJob
    queue_as :default

    def perform(idea, url)
      return if idea.applying?

      SlackNotifier.new.apply_send(idea, url)
      SendEmail.new.confirm_apply(idea)
    end
  end
end
