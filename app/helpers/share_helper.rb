module ShareHelper
  def twitter_share(text, url)
    "https://twitter.com/intent/tweet?text=#{text}&url=#{url}"
  end
end
