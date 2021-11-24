class TwitterTweet
  def initialize
    @client = Twitter::REST::Client.new do |config|
      config.consumer_key        = Rails.application.credentials.dig(:twitter, :consumer_key)        # API Key
      config.consumer_secret     = Rails.application.credentials.dig(:twitter, :consumer_secret)     # API Secret Key
      config.access_token        = Rails.application.credentials.dig(:twitter, :access_token)        # Access Token
      config.access_token_secret = Rails.application.credentials.dig(:twitter, :access_token_secret) # Access Token Secret
    end
  end

  def tweet(idea, url)
    user = User.find(idea.user_id)
    twitter_user = user&.twitter_id.present? ? "@#{user.twitter_id} " : ''
    @client.update("【新しいアイデア投稿】\n#{idea.name}\n#{twitter_user}#ideee\n#{url}")
  end
end
