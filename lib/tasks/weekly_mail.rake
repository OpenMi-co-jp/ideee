namespace :weekly_mail do
  desc '毎週月曜の7時に週間メールを送る'
  task send: :environment do
    SendWeeklyMailJob.perform_now
  rescue StandardError => e
    puts "============rescue error #{e}========"
    SlackNotifier.new.send_error_report('週間メール送信', e)
  end
end
