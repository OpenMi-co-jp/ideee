module TwitterJob
  class Tweet < ApplicationJob
    queue_as :default

    def perform(idea, url)
      TwitterTweet.new.tweet(idea, url)
    end
  end
end
