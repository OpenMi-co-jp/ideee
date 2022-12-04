namespace :product_apply do
  desc 'product_urlの承認許可コマンド'
  task :send_approve, ['id'] => :environment do |_task, args|
    idea = Idea.find(args[:id])
    idea.update(product_apply: :approved)
    User.first.create_notification_product_apply(idea)
  end
end
