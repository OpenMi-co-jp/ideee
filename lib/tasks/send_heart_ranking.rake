namespace :send_heart_ranking do
  desc '先週ハートが多かったアイデアをメールで送る'
  task send: :environment do
    SendEmail.new.send_heart_ranking
  end
end
