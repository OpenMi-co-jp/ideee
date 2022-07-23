module IdeasHelper
  def image_set(idea)
    # アイデアの画像がなければ自動生成で設定
    if idea&.icon.file.nil?
      image_tag(return_ogp_url(idea.name))
    else
      image_tag(idea.icon.to_s)
    end
  end

  def idea_opened_date(idea)
    if idea.draft
      idea.created_time
    else
      idea.published_time
    end
  end
end
