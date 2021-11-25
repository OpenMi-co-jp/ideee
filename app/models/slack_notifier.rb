class SlackNotifier
  attr_reader :client

  WEBHOOK_URL = Rails.application.credentials.dig(:slack, :api_url)
  CHANNEL = "#ideee_app_bot" # Slackで送りたいチャンネルを指定

  def initialize
    @client = Slack::Notifier.new(WEBHOOK_URL, channel: CHANNEL)
  end

  def send(object, url)
    if url.include? 'users' # ユーザーが増加するとき
      type = object&.provider == nil ? 'メール' : object&.provider
      article = "🙋‍♂️ #{type}でユーザー登録！\nURL: #{url}\n現在のユーザー数：#{User.all.length} 人 🙋‍♀️"
    else # アイデアが増加するとき
      article = "💡 新アイデアの投稿！ by #{object.user.name}\nタイトル: #{object.name}\nURL: #{url}\n現在のアイデア🚀\n投稿数：#{Idea.published.length} 下書き数：#{Idea.drafts.length}"
    end

    Slack::Notifier.new(WEBHOOK_URL, channel: CHANNEL).ping(article)
  end

  def send_analytics_report(new_users, sessions)
    channel = "#analytics_bot"
    article = "ユーザーセッション【#{Time.current.yesterday.strftime('%Y / %m/ %d')}】\n新しいユーザー数：#{new_users}\nセッション数: #{sessions} 👏"
    Slack::Notifier.new(WEBHOOK_URL, channel: channel).ping(article)
  end
end
