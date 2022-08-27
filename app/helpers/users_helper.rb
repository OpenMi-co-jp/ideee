module UsersHelper
  # ユーザーのアイコンサイズをパラメーターで指定できるように設定
  # アイコンが無ければデフォルトの画像を表示
  def user_icon(user, size: 'normal')
    if user.icon.present?
      image_tag(user.icon.to_s, class: "icon-circle #{size}", loading: 'lazy')
    elsif user.remote_url
      image_tag(user.remote_url, class: "icon-circle #{size}", loading: 'lazy')
    else
      image_tag('undefined_user_icon', class: "icon-circle #{size}", loading: 'lazy')
    end
  end

  def twitter_url(id)
    return if id.nil?

    # TODO: put twitter icon here
    "https://twitter.com/#{id}"
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
