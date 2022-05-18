module IdeasHelper
  def image_set(idea)
    # アイデアの画像がなければ自動生成で設定
    if idea&.icon.file.nil?
      image_tag(return_ogp_url(idea.name))
    else
      image_tag(idea.icon.to_s)
    end
  end

  def idea_sort_hash
    {
      ハート数: :likes_num,
      コメント数: :comments_num,
      ビュー数: :view,
      公開日: :published_at
    }
  end

  def idea_order_hash
    {
      '昇順 ▲': :asc,
      '降順 ▼': :desc
    }
  end

  def idea_opened_date(idea)
    if idea.draft
      idea.created_time
    else
      idea.published_time
    end
  end
end
