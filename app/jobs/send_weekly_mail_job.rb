class SendWeeklyMailJob < ApplicationJob
  queue_as :default

  def perform
    return unless Rails.env.production?

    # 1週間後の同じ時間に実行
    SendWeeklyMailJob.delay_for(1.week).perform_now
    ideas = Idea.published.recent_select
    new_ideas = ideas.not_emailed
    # 新しいアイデアが10件無ければその週のメールはスキップ
    return if new_ideas.length < 10

    commented_ideas = ideas.order(comments_num: 'DESC').first(10)
    selected_ideas = new_ideas.order(published_at: 'DESC').first(10)
    SendEmail.new.send_heart_ranking_and_new_idea(commented_ideas, selected_ideas)
    new_ideas.each do |idea|
      idea.update_column(:emailed_at, Time.zone.now)
    end
  end
end
