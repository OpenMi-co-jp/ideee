module UsersHelper
  def user_icon(user, size: 'normal')
    user.icon.present? ? image_tag(user.icon.to_s, class: "icon-circle #{size}") : image_tag('undefined_user_icon.png', class: "icon-circle #{size}")
  end

  def twitter_url(id)
    return if id.nil?
    # TODO: put twitter icon here
    link_to id, "https://twitter.com/#{id}", target: :_blank, rel: "noopener noreferrer"
  end

  def user_definiton(user)
    case user.definition
    when 'idea_man' then
      icon = '💡'
    when 'engineer' then
      icon = '🛠'
    when 'idea_engineer' then
      icon = '💡・🛠'
    end
    "#{icon} #{I18n.t("enums.user.definition.#{user.definition}")}" if user.definition
  end

  def own_user_checked(user)
    current_user&.id == user.id
  end
end
