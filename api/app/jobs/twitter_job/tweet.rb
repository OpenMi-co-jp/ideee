# frozen_string_literal: true

module TwitterJob
  class Tweet < ApplicationJob
    queue_as :high

    def perform(idea, url)
      return unless Rails.env.production?

      Twitter.new.tweet(idea, url)
    end
  end
end
