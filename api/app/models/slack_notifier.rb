# frozen_string_literal: true

class SlackNotifier
  attr_reader :client

  WEBHOOK_URL = Rails.application.credentials.dig(:slack, :api_url)
  CHANNEL = '#ideee_app_bot' # Slackで送りたいチャンネルを指定

  def initialize
    @client = Slack::Notifier.new(WEBHOOK_URL)
  end

  def send(object, url)
    if url.include? 'users' # ユーザーが増加するとき
      type = object&.provider.nil? ? 'メール' : object&.provider
      article = "🙋‍♂️ #{type}でユーザー登録！\nURL: #{url}\n現在のユーザー数：#{User.all.length} 人 🙋‍♀️"
    else # アイデアが増加するとき
      article = "💡 新アイデアの投稿！ by #{object.user.name}\nタイトル: #{object.name}\nURL: #{url}\n" \
                "現在のアイデア🚀\n投稿数：#{Idea.published.length} 下書き数：#{Idea.drafts.length}"
    end

    Slack::Notifier.new(WEBHOOK_URL, channel: CHANNEL).ping(article)
  end

  def apply_send(object, url)
    article = "🎉 アイデアが完成したようです！🎉\nURL: #{url}\nプロダクトのあるアイデア数: #{Idea.deployed.length}\n" \
              "承認待ちURL: #{object.product_url}\n承認する時のコマンド：\n```heroku run rake product_apply:send_approve[#{object.id}]```"
    channel = '#ideee_user_apply'
    Slack::Notifier.new(WEBHOOK_URL, channel:).ping(article)
    object.update!(product_apply: :applying)
  end

  def send_analytics_report(new_users, sessions)
    channel = '#analytics_bot'
    recent_ideas = Idea.published.recent_select.size
    recent_comment_users = Comment.weekly_comments.pluck(:user_id).uniq.size
    monthly_comments = Comment.where(created_at: 40.days.ago..Time.zone.now).size.to_f
    article = "データ【#{Time.current.yesterday.strftime('%Y / %m/ %d')}】\n新しいユーザーセッション：#{new_users}👏 セッション数: #{sessions} 👀\n" \
              "40日以内のアイデア： #{recent_ideas}💡 今週のコメンテーター数： #{recent_comment_users}💬\n" \
              "今月のアイデア数に対してのコメント数値：  🔥#{(monthly_comments / recent_ideas.to_f).round(2)}🔥 = (#{monthly_comments} / #{recent_ideas})"
    Slack::Notifier.new(WEBHOOK_URL, channel:).ping(article)
  end

  def send_error_report(title, error)
    channel = '#エラー報告channel'
    article = "タイトル： #{title}\n--------------------\n#{error}"
    Slack::Notifier.new(WEBHOOK_URL, channel:).ping(article)
  end

  def trial
    channel = '#slack_テスト用'
    article = '==================テストデータ================'
    Slack::Notifier.new(WEBHOOK_URL, channel:).ping(article)
    Slack::IdeaSendJob.set(wait: 5.minutes).perform_later
  end
end
