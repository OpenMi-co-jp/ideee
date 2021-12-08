module ShareHelper
  def twitter_share(content, root = false)
    # footerでのアプリ自体のシェアか、アイデアのシェアかどうかで分岐
    if root
      url = full_url
      text = content
      twitter_id = 'ideee_tech'
    else
      url = request.url
      text = content.name
      twitter_id = content&.user.twitter_id
    end
    "https://twitter.com/intent/tweet?text=#{text}&hashtags=ideee&via=#{twitter_id}&related=ideee_tech&url=#{url}"
  end

  def sns_share(media, root = false)
    link_to root ? t(".share.#{media}") : share_page(media), target: '_blank' do
      image_tag "#{media}_icon.png", class: "share__icon", alt: "#{media} share"
    end
  end

  def share_page(media)
    t(".share.#{media}", url: request.url)
  end
end
