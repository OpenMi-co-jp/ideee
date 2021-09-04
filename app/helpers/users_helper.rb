module UsersHelper
  def user_icon(user)
    user.icon.present? ? image_tag(user.icon.to_s) : tag.i('account_circle', class: 'material-icons user-icon')
  end

  def twitter_url(id)
    return if id.nil?
    # TODO: put twitter icon here
    link_to id, "https://twitter.com/#{id}", target: :_blank, rel: "noopener noreferrer"
  end
end
