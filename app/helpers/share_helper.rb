module ShareHelper
  def twitter_share(item)
    # footerでのアプリ自体のシェアか、アイデアのシェアかどうかで分岐
    if item.nil?
      url = full_url
      text = 'アイデアとエンジニアのマッチングサイトideee'
      twitter_id = 'ideee_tech'
    else
      url = request.url
      text = item.name
      twitter_id = item&.user.twitter_id
    end
    "https://twitter.com/intent/tweet?text=#{text}&hashtags=ideee&via=#{twitter_id}&related=ideee_tech&url=#{url}"
  end

  def sns_share(media)
    link_url = t('.page') == 'footer' ? t(".share.#{media}") : share_page(media)
    link_to link_url, target: '_blank' do
      image_tag "#{media}_icon.png",
        class: "c-share__icon #{'idea-show__share-icon' if t('.page') == 'idea-show'}",
        alt: "#{media.capitalize} share"
    end
  end

  def share_page(media)
    t(".share.#{media}", url: request.url)
  end
end
