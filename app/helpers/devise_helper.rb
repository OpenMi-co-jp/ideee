module DeviseHelper
  # providerに合わせた画像名を選択
  def omni_sign_image(provider)
    image_tag "#{provider}_icon", class: "omniauth-sign-up", size: '32x32'
  end

  # ログインか登録のページかどうかで文言の分岐
  def omni_sign_word
    submit = controller_name == 'sessions' ? 'ログイン' : 'ユーザー登録'
    tag.p "＼ #{submit} ／", class: "omniauth-sign-up"
  end
end
