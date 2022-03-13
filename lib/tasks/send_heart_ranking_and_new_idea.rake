namespace :send_heart_ranking_and_new_ideas do
  desc '最近のハートが多いアイデア、最新アイデアをメールで送る'
  task send_ranking_email: :environment do
    users = User.all
    ideas = Idea.published.recent_select
    liked_ideas = ideas.order(likes_num: 'DESC').first(10)
    new_ideas = ideas.order(published_at: 'DESC').first(10)
    SendEmail.new.send_heart_ranking_and_new_idea(users, liked_ideas, new_ideas)
  end
end
