module UsersHelper
  def user_icon(user, size: 'normal')
    user.icon.present? ? image_tag(user.icon.to_s, class: "icon-circle #{size}") : image_tag('undefined_user_icon.png', class: "icon-circle #{size}")
  end

  def twitter_url(id)
    return if id.nil?
    # TODO: put twitter icon here
    "https://twitter.com/#{id}"
  end

  def user_definiton(user, ver='normal')
    case user.definition
    when 'idea_man' then
      icon = '💡'
    when 'engineer' then
      icon = '🛠'
    when 'idea_engineer' then
      icon = '💡 🛠'
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
