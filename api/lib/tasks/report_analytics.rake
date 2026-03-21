# frozen_string_literal: true

namespace :report_analytics do
  desc '前日のアナリティクス情報をSlackに送る'
  task send_to_slack: :environment do
    # Analytics functionality has been removed
    # Analytics reporting is no longer available
    Rails.logger.warn 'report_analytics:send_to_slack task called but analytics functionality has been removed'
  end
end
