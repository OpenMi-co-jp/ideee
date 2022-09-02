module DeviseHelper
  # providerに合わせた画像名を選択
  def omni_sign_image(provider)
    image_tag "#{provider}_icon", class: 'omniauth-sign-up', size: '32x32', loading: 'lazy', alt: '認証画像'
  end

  # ログインか登録のページかどうかで文言の分岐
  def omni_sign_word
    submit = controller_name == 'sessions' ? 'ログイン' : 'ユーザー登録'
    tag.p "＼ #{submit} ／", class: 'omniauth-sign-up'
  end

  def email_valid_text
    tag.span '', class: 'helper-text', data: { error: '正しい形式のメールアドレスを入力してください。', success: 'OK' }
  end

  def password_valid_text
    tag.span '', class: 'helper-text', data: { error: "#{@minimum_password_length}文字以上のパスワードを入力してください。", success: 'OK' }
  end

  # 前回のログイン方法を出力
  def previous_login
    return if cookies[:devise_provider].blank?

    provider_name = t("activerecord.attributes.user.provider.#{cookies[:devise_provider]}")
    tag.p "前回は#{provider_name}でログインしました", class: 'previous-login'
  end
end
