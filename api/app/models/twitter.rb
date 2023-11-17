# frozen_string_literal: true

class Twitter
  def initialize
    consumer_key = Rails.application.credentials.dig(:twitter_bot, :consumer_key)
    consumer_secret = Rails.application.credentials.dig(:twitter_bot, :consumer_secret)
    access_token = Rails.application.credentials.dig(:twitter_bot, :access_token)
    access_token_secret = Rails.application.credentials.dig(:twitter_bot, :access_token_secret)

    # OAuth Consumerオブジェクトを作成
    consumer = OAuth::Consumer.new(
      consumer_key, consumer_secret,
      site: 'https://api.twitter.com',
      debug_output: false
    )

    # OAuth Access Tokenオブジェクトを作成
    access_token = OAuth::AccessToken.new(consumer, access_token, access_token_secret)

    # OAuthパラメータをまとめたハッシュを作成
    @oauth_params = {
      consumer:,
      token: access_token
    }
  end

  def tweet(idea, url)
    create_tweet_url = 'https://api.twitter.com/2/tweets'

    user = User.find(idea.user_id)
    twitter_user = user&.twitter_id.present? ? "@#{user.twitter_id} " : ''
    hashtags = ['ideee', idea.idea_tags&.pluck(:name)].flatten.map { "##{_1}" }.join(' ')

    json_payload = { "text": "【新しいアイデア投稿】\n#{idea.name}\n#{twitter_user}#{hashtags}\n#{url}" }

    create_tweet(create_tweet_url, json_payload)
  end

  private
  def create_tweet(url, json_payload)
    options = {
      method: :post,
      headers: {
        "User-Agent": 'v2CreateTweetRuby',
        "content-type": 'application/json'
      },
      body: JSON.dump(json_payload)
    }
    request = Typhoeus::Request.new(url, options)
    oauth_helper = OAuth::Client::Helper.new(request, @oauth_params.merge(request_uri: url))
    # Signs the request
    request.options[:headers]['Authorization'] = oauth_helper.header
    request.run
  end
end
