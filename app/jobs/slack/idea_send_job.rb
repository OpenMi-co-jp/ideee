module Slack
  class IdeaSendJob < ApplicationJob
    queue_as :default

    def perform
      # 本番用トライアル
      puts '-------------perform------'
      SlackNotifier.new.trial
      # new_users = Analytics.new.daily_total_count('newUsers')
      # sessions = Analytics.new.daily_total_count('sessions')
      # SlackNotifier.new.send_analytics_report(new_users, sessions)
    end
  end
end
