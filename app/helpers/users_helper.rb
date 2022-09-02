module UsersHelper
  # ユーザーのアイコンサイズをパラメーターで指定できるように設定
  # アイコンが無ければデフォルトの画像を表示
  def user_icon(user, size: 'normal')
    icon_url =
      if user.icon.present?
        user.icon.to_s
      elsif user.remote_url
        user.remote_url
      else
        'undefined_user_icon'
      end
    image_tag(icon_url, class: "circle icon-circle #{size}", loading: 'lazy', alt: "#{user.name}のアイコン")
  end

  def twitter_url(id)
    return if id.nil?

    # TODO: put twitter icon here
    "https://twitter.com/#{id}"
  end

  def github_url(id)
    return if id.nil?

    "https://github.com/#{id}"
  end

  # ユーザーのタイプをアイコンで表示
  def user_definiton(user, ver = 'normal')
    case user.definition
    when 'idea_man'
      icon = '💡　'
    when 'engineer'
      icon = '🛠　'
    when 'idea_engineer'
      icon = '💡 🛠　'
    end
    if ver == 'normal'
      "#{icon} #{I18n.t("enums.user.definition.#{user.definition}")}" if user.definition
    elsif ver == 'short'
      icon if user.definition
    end
  end

  def own_user_checked(user)
    current_user&.id == user.id
  end
end
