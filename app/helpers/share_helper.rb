module ShareHelper
  def twitter_share(content, root=false)
    if root
      url = full_url
      text = content
      twitter_id='ideee_tech'
    else
      url = request.url
      text = content.name
      twitter_id = content&.user.twitter_id
    end
    "https://twitter.com/intent/tweet?text=#{text}&hashtags=ideee&via=#{twitter_id}&related=ideee_tech&url=#{url}"
  end
end
