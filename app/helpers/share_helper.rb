module ShareHelper
  def twitter_share(content, root=false)
    # footerでのアプリ自体のシェアか、アイデアのシェアかどうかで分岐
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

  def sns_share(sns)
    url = request.url
    t(".share.#{sns}", url: url)
  end
end
