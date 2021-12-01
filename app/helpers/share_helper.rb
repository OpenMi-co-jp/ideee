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

  def facebook_share(root=false)
    if root
      url = "https://www.ideee.tech"
    else
      url = request.url
    end
    "https://www.facebook.com/share.php?u=#{url}"
  end

  def line_share(content, root=false)
    if root
      url = "https://www.ideee.tech"
      text = content
    else
      url = request.url
      text = content.name
    end
    "https://social-plugins.line.me/lineit/share?url=#{text}#{url}"
  end

  def hatebu_share(root=false)
    if root
      url = "https://www.ideee.tech"
    else
      url = request.url
    end
    "https://b.hatena.ne.jp/entry/#{url}"
  end
end
