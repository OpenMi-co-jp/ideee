# frozen_string_literal: true

module TwitterJob
  class Tweet < ApplicationJob
    queue_as :default
    sidekiq_options retry: 0

    def perform(idea, url)
      TwitterTweet.new.tweet(idea, url)
    rescue StandardError => e
      Rails.logger.debug e.message
      Rails.logger.debug e.backtrace
      SlackNotifier.new.send_error_report('Twitter自動投稿', e.message)
      raise e
    end
  end
end
