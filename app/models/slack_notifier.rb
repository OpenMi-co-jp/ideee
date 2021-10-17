class SlackNotifier
  attr_reader :client

  WEBHOOK_URL = ENV["SLACK_API_URL"]
  CHANNEL = "#ideee_app_bot"

  def initialize
    @client = Slack::Notifier.new(WEBHOOK_URL, channel: CHANNEL)
  end

  def send(object, url)
    if url.include? 'users'
      type = object&.provider == nil ? 'メール' : object&.provider
      article = "🙋‍♂️ #{type}でユーザー登録！\nURL: #{url}\n現在のユーザー数：#{User.all.length} 人 🙋‍♀️"
    else
      article = "💡 新アイデアの投稿！ by #{object.user.name}\nタイトル: #{object.name}\nURL: #{url}\n現在のアイデア数：#{Idea.all.length} 🚀"
    end

    Slack::Notifier.new(WEBHOOK_URL, channel: CHANNEL).ping(article)
  end
end
