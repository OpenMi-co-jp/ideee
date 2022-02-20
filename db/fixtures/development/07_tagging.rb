20.times do |m|
  outer_num = 3 * m
  idea_num = 1 + m
  # タグが被らないように3つランダムに選択
  tags = Tag.all.sample(3)
  (0..2).each do |num|
    Tagging.seed(
      :id,
      { id: num + outer_num, idea_id: idea_num, tag: tags[num] }
    )
    # 同一の組み合わせがあった場合はrescueでエラーハンドリング
  rescue ActiveRecord::RecordNotUnique
  end
end
