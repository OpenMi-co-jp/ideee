namespace :event_new_year do
  desc 'お年玉企画のメール'
  task send_event_email: :environment do
    SendEmail.new.event_new_year
  end
end
