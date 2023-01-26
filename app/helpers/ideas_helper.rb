# frozen_string_literal: true

module IdeasHelper
  def image_set(idea)
    # アイデアの画像がなければ自動生成で設定
    if idea&.icon.file.nil?
      image_tag(return_ogp_url(idea.name), alt: "#{idea.name}の画像")
    else
      image_tag(idea.icon.to_s, alt: "#{idea.name}の画像")
    end
  end

  def idea_opened_date(idea)
    if idea.draft
      idea.created_time
    else
      idea.published_time
    end
  end

  def length_invalid_text(length)
    tag.span '', class: 'helper-text', data: { error: "#{length}文字以内で入力してください。", success: 'OK' }
  end

  def between_length_invalid_text(length)
    tag.span '', class: 'helper-text', data: { error: "1〜#{length}文字で入力してください。", success: 'OK' }
  end
end
