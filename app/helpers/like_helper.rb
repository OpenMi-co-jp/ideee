# frozen_string_literal: true

module LikeHelper
  # 自分のアイデアであればLikeボタンを押せなくする
  def own_object?(object)
    'disable-click' if current_user&.own?(object)
  end
end
