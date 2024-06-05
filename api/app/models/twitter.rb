# frozen_string_literal: true

require 'oauth'
require 'json'

class Twitter
  def initialize
    twitter_credentials = Rails.application.credentials[:twitter_bot]
    @consumer = OAuth::Consumer.new(
      twitter_credentials[:consumer_key],
      twitter_credentials[:consumer_secret],
      site: 'https://api.twitter.com',
      debug_output: true
    )
    @token = OAuth::Token.new(twitter_credentials[:access_token], twitter_credentials[:access_token_secret])
  end

  def tweet(idea, url)
    twitter_user = idea.user.twitter_id.present? ? "@#{idea.user.twitter_id} " : ''
    hashtags = ['ideee', *idea.idea_tags&.pluck(:name)].map { |tag| "##{tag}" }.join(' ')
    tweet_text = "【新しいアイデア投稿】\n#{idea.name}\n#{twitter_user}#{hashtags}\n#{url}"

    @consumer.request(
      :post,
      'https://api.twitter.com/2/tweets',
      @token,
      {},
      { text: tweet_text }.to_json,
      'Content-Type' => 'application/json'
    )
  end
end
