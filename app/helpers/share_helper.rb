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

  def share_sns(media)
    link_to sns_share("#{media}"), target: '_blank' do
      image_tag "#{media}_icon.png", class: "share__icon", alt: "#{media} share"
    end
  end

  def sns_share(sns)
    t(".share.#{sns}", url: request.url)
  end
end
