module UsersHelper
  def user_icon(user)
    user&.icon ? image_tag(user.icon) : tag.i('account_circle', class: 'material-icons user-icon')
  end
end
