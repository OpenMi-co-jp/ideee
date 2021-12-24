namespace :send_heart_ranking do
  desc '最近ハートが多かったアイデアをメールで送る'
  task send: :environment do
    @users = User.all
    @ideas = Idea.published.recent_select
    @liked_ideas = @ideas.order(likes_num: "DESC").first(10)
    SendEmail.new.send_heart_ranking(@users, @liked_ideas)
  end
end
