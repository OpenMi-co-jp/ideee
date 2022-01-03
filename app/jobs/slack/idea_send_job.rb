module Slack
  class IdeaSendJob < ApplicationJob
    queue_as :default

    def perform
      # 本番用トライアル
      puts '-------------perform------'
      SlackNotifier.new.trial
    end
  end
end
