module PublishMail
  extend ActiveSupport::Concern

  def send_ai_feature_announcement(user)
    @user = user
    @ai_features = [
      { name: 'AIブラッシュアップ', description: 'アイデアを入力するだけで、AIがフレームワークに基づいて詳細を埋めてくれます。' },
      { name: 'AIレビュー', description: 'あなたのアイデアに対して、ポジティブ・ネガティブな視点からのフィードバックを提供します。' },
      { name: '毎日のAIアイデア投稿', description: '毎朝8時に、最新のニュースを基にしたユニークなアイデアをAIが投稿します。' }
    ]
    @article_url = 'https://qiita.com/naruqiita/items/10eb825268bb065aa6a6'

    subject = '無料でAI活用！ideeeの新機能で個人開発を盛り上げる'
    mail(
      to: @user.email,
      subject:,
      template_path: 'devise/mailer',
      template_name: 'ai_feature_announcement'
    )
  end
end
