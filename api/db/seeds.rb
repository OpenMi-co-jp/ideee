# frozen_string_literal: true

# seed_fuが上手く動かない時にコメントアウトを外し、rails db:seedを実行

# 30.times do |n|
#   num = n + 1
#   user = User.new(name: Faker::JapaneseMedia::OnePiece.character, password: 'password', email: Faker::Internet.email, definition: [0,1,2].sample, confirmed_at: Time.now, defined: true)
#   user.save!
# end
AdminUser.create!(email: 'admin@example.com', password: 'password', password_confirmation: 'password') if Rails.env.development?
