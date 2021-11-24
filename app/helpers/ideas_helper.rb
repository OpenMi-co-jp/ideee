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
      いいねが多い順: :likes_num,
      コメント数が多い順: :comments_num,
      View数が多い順: :view,
      名前の昇順: :asc,
      名前の降順: :desc,
      作成日が新しい順: :newly_created,
      作成日が古い順: :old_created
    }
  end
end
