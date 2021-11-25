class SlackNotifier
  attr_reader :client

  WEBHOOK_URL = Rails.application.credentials.dig(:slack, :api_url)
  CHANNEL = "#ideee_app_bot" # Slackで送りたいチャンネルを指定

  def initialize
    @client = Slack::Notifier.new(WEBHOOK_URL)
  end

  def send(object, url)
    if url.include? 'users' # ユーザーが増加するとき
      type = object&.provider == nil ? 'メール' : object&.provider
      article = "🙋‍♂️ #{type}でユーザー登録！\nURL: #{url}\n現在のユーザー数：#{User.all.length} 人 🙋‍♀️"
    else # アイデアが増加するとき
      article = "💡 新アイデアの投稿！ by #{object.user.name}\nタイトル: #{object.name}\nURL: #{url}\n" +
        "現在のアイデア🚀\n投稿数：#{Idea.published.length} 下書き数：#{Idea.drafts.length}"
    end

    Slack::Notifier.new(WEBHOOK_URL, channel: CHANNEL).ping(article)
  end

  def apply_send(object, url)
    return unless Rails.env.production?
    if !object.approved? && object.product_url&.strip.length > 0
      article = "🎉 アイデアが完成したようです！🎉\nURL: #{url}\nプロダクトのあるアイデア数: #{Idea.deployed.length}\n" +
        "承認待ちURL: #{object.product_url}\n承認する時のコマンド：\n```heroku run rake product_apply:send_approve[#{object.id}]```"
      channel = "#ideee_user_apply"
      Slack::Notifier.new(WEBHOOK_URL, channel: channel).ping(article)
    end
  end
end
