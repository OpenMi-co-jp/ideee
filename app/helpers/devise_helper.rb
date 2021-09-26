module DeviseHelper
  def omni_sign_image(provider)
    image_tag "#{provider}_icon.png", class: "#{provider}-sign-up", size: '32x32'
  end

  def omni_sign_word(provider)
    submit = controller_name == 'sessions' ? 'ログイン' : 'ユーザー登録'
    tag.p "＼ #{OmniAuth::Utils.camelize(provider)}で#{submit} ／", class: "#{provider}-sign-up"
  end
end
