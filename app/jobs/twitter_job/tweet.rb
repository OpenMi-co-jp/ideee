module TwitterJob
  class Tweet < ApplicationJob
    queue_as :default

    def perform(idea)
      TwitterTweet.new.tweet(idea, idea_url(idea.id))
    end
  end
end
