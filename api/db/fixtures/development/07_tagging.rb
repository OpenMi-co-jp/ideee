# frozen_string_literal: true

20.times do |m|
  outer_num = m * 3
  idea_num = m + 1
  # タグが被らないように3つランダムに選択
  tags = Tag.all.sample(3)
  3.times do |num|
    Tagging.seed(
      :id,
      { id: num + outer_num, idea_id: idea_num, tag: tags[num] }
    )
    # 同一の組み合わせがあった場合はrescueでエラーハンドリング
  rescue ActiveRecord::RecordNotUnique
  end
end
