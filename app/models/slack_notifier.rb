class SlackNotifier
  attr_reader :client

  WEBHOOK_URL = ENV["SLACK_API_URL"]
  CHANNEL = "#ideee_idea_bot"

  def initialize
    @client = Slack::Notifier.new(WEBHOOK_URL, channel: CHANNEL)
  end

  def send(object, url)
    article = "新しいアイデアの投稿がありました。\nタイトル: #{object.name}\nURL: #{url}"
    Slack::Notifier.new(WEBHOOK_URL, channel: CHANNEL).ping(article)
  end
end
