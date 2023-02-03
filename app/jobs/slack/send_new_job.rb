# frozen_string_literal: true

module Slack
  class SendNewJob < ApplicationJob
    queue_as :default

    def perform(item, url)
      SlackNotifier.new.send(item, url)
    end
  end
end
