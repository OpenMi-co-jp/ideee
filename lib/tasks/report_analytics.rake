namespace :report_analytics do
  desc '前日のアナリティクス情報をSlackに送る'
  task send_to_slack: :environment do
    new_users = Analytics.new.daily_total_count('newUsers')
    sessions = Analytics.new.daily_total_count('sessions')
    SlackNotifier.new.send_analytics_report(new_users, sessions)
  end
end
