module ShareHelper
  def sns_share_icon(media)
    link_to link_url(media), target: '_blank', rel: 'noopener' do
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
      hashtags = 'ideee'
      hashtags += ",#{@idea.idea_tags.pluck(:name).join(',')}" if @idea.idea_tags.length.positive?

      t('default.sns.share.twitter',
        url: request.url,
        text: @idea.name,
        hashtags: hashtags,
        twitter_id: @idea&.user.twitter_id)
    else
      t("default.sns.share.#{media}", url: request.url)
    end
  end
end
