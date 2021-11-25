module IdeasHelper
  def image_set(idea)
    # アイデアの画像がなければ自動生成で設定
    if idea&.icon.file.nil?
      image_tag(return_ogp_url(idea.name))
    else
      image_tag(idea.icon.to_s)
    end
  end

  def sort_hash
    {
      いいね数順: :likes_num,
      コメント数順: :comments_num,
      View数順: :view,
      名前: :name,
      作成日: :created_at
    }
  end

  def order_hash
    {
      昇順: :asc,
      降順: :desc
    }
  end
end
