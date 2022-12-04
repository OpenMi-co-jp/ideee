class TwitterTweet
  def initialize
    @client = Twitter::REST::Client.new do |config|
      config.consumer_key        = Rails.application.credentials.dig(:twitter_bot, :consumer_key)        # API Key
      config.consumer_secret     = Rails.application.credentials.dig(:twitter_bot, :consumer_secret)     # API Secret Key
      config.access_token        = Rails.application.credentials.dig(:twitter_bot, :access_token)        # Access Token
      config.access_token_secret = Rails.application.credentials.dig(:twitter_bot, :access_token_secret) # Access Token Secret
    end
  end

  def tweet(idea, url)
    user = User.find(idea.user_id)
    twitter_user = user&.twitter_id.present? ? "@#{user.twitter_id} " : ''
    hashtags = '#ideee'
    hashtags = [hashtags, idea.idea_tags.pluck(:name)].flatten.join(' #') if idea.idea_tags.length.positive?

    @client.update("【新しいアイデア投稿】\n#{idea.name}\n#{twitter_user}#{hashtags}\n#{url}")
  end
end
