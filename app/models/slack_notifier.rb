class SlackNotifier
  attr_reader :client

  WEBHOOK_URL = ENV["SLACK_API_URL"]
  CHANNEL = "#ideee_idea_bot"

  def initialize
    @client = Slack::Notifier.new(WEBHOOK_URL, channel: CHANNEL)
  end

  def send(object, url)
    return if !Rails.env.production?
    if url.include? 'users'
      type = object.provider == nil ? 'メール' : object.provider
      article = "新しいユーザーが#{type}で登録されました。\nURL: #{url}"
    else
      article = "新しいアイデアの投稿がありました。\nタイトル: #{object.name}\nURL: #{url}"
    end

    Slack::Notifier.new(WEBHOOK_URL, channel: CHANNEL).ping(article)
  end
end
