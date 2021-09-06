module ShareHelper
  def twitter_share(text, url)
    "https://twitter.com/intent/tweet?text=#{text}&hashtags=ideee&url=#{url}"
  end
end
