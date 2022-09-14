module ShareHelper
  def sns_share_icon(media)
    link_to link_url(media), target: '_blank' do
      image_tag "sns-icons/#{media}_icon",
                class: "c-share__icon #{'idea-show__share-icon' if t('.page') == 'idea-show'}",
                alt: "#{media.capitalize} share",
                loading: 'lazy'
    end
  end

  def link_url(media)
    if t('.page') == 'footer'
      t(".share.#{media}")
    elsif media == 'twitter'
      keyword = "#"
      if @idea.name.include?(keyword) then
        tags = @idea.name.scan(/[#][Ａ-Ｚａ-ｚA-Za-z一-鿆0-9０-９ぁ-ヶｦ-ﾟー]+/).map{|t| t.delete_prefix(keyword)}
        hashtag = ["ideee",tags].join(',')
      else
        hashtag = "ideee"
      end
      t('default.sns.share.twitter', 
        url: request.url,
        text: @idea.name,
        hashtags:hashtag,
        twitter_id: @idea&.user.twitter_id)
    else
      t("default.sns.share.#{media}", url: request.url)
    end
  end
end
