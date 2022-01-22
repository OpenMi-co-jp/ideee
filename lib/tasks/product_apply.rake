namespace :product_apply do
	desc 'product_urlの承認許可コマンド'
	task :send_approve, ['id'] => :environment do |task, args|
		Idea.find_by!(id: args[:id]).update!(product_apply: :approved)
	end
end
