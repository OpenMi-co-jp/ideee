module DeviseHelper
  # providerに合わせた画像名を選択
  def omni_sign_image(provider)
    image_tag "#{provider}_icon", class: 'omniauth-sign-up', size: '32x32', loading: 'lazy'
  end

  # ログインか登録のページかどうかで文言の分岐
  def omni_sign_word
    submit = controller_name == 'sessions' ? 'ログイン' : 'ユーザー登録'
    tag.p "＼ #{submit} ／", class: 'omniauth-sign-up'
  end

  def password_helper_text
    tag.span '', class: 'helper-text', data: { error: "#{@minimum_password_length}文字以上のパスワードを入力してください。" }
  end
end
