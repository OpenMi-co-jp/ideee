# == Schema Information
#
# Table name: users
#
#  id                     :bigint           not null, primary key
#  confirmation_sent_at   :datetime
#  confirmation_token     :string(255)
#  confirmed_at           :datetime
#  defined                :boolean
#  definition             :integer
#  description            :string(200)
#  email                  :string(255)
#  encrypted_password     :string(255)      default(""), not null
#  icon                   :string(255)
#  name                   :string(30)       default("")
#  point                  :integer
#  provider               :string(255)
#  remember_created_at    :datetime
#  remote_url             :string(255)
#  reset_password_sent_at :datetime
#  reset_password_token   :string(255)
#  site_url               :string(255)
#  uid                    :string(255)
#  unconfirmed_email      :string(255)
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#  twitter_id             :string(255)
#
# Indexes
#
#  index_users_on_email                 (email) UNIQUE
#  index_users_on_reset_password_token  (reset_password_token) UNIQUE
#
FactoryBot.define do
  factory :user do
    name { Faker::JapaneseMedia::OnePiece.character }
    sequence(:email)   { |n| "sample#{n}@example.com" }
    definition { User.definitions.values.sample }
    defined { true }
    confirmed_at { Time.now }
    password { 'password' }

    trait :idea_man do
      definition { 0 }
    end
    trait :engineer do
      definition { 1 }
    end
    trait :idea_engineer do
      definition { 2 }
    end
  end
end
