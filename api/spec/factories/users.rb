# frozen_string_literal: true

# == Schema Information
#
# Table name: users
#
#  id                                        :bigint           not null, primary key
#  allow_password_change(パスワード変更許可) :boolean          default(FALSE), not null
#  confirmation_sent_at                      :datetime
#  confirmation_token                        :string(255)
#  confirmed_at                              :datetime
#  current_sign_in_at                        :datetime
#  current_sign_in_ip                        :string(255)
#  defined                                   :boolean
#  definition                                :integer
#  description                               :string(200)
#  email                                     :string(255)
#  encrypted_password                        :string(255)      default(""), not null
#  icon                                      :string(255)
#  ideas_num                                 :integer          default(0)
#  last_sign_in_at                           :datetime
#  last_sign_in_ip                           :string(255)
#  name                                      :string(30)       default("")
#  point                                     :integer          default(0)
#  provider                                  :string(255)      default("email"), not null
#  remember_created_at                       :datetime
#  remote_url                                :string(255)
#  reset_password_sent_at                    :datetime
#  reset_password_token                      :string(255)
#  sign_in_count                             :integer          default(0), not null
#  site_url                                  :string(255)
#  tokens(認証用トークン)                    :json
#  uid                                       :string(255)      default(""), not null
#  unconfirmed_email                         :string(255)
#  created_at                                :datetime         not null
#  updated_at                                :datetime         not null
#  github_id                                 :string(255)
#  twitter_id                                :string(255)
#
# Indexes
#
#  index_users_on_email                 (email) UNIQUE
#  index_users_on_reset_password_token  (reset_password_token) UNIQUE
#
FactoryBot.define do
  factory :user do
    name { Faker::JapaneseMedia::OnePiece.character }
    sequence(:email) { |n| "sample#{n}@example.com" }
    definition { User.definitions.values.sample }
    defined { true }
    confirmed_at { Time.zone.now }
    password { 'password' }
    ideas_num { 0 }
    uid { SecureRandom.uuid }

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

  trait :idea do
    ideas { [FactoryBot.build(:idea, :like)] }
  end

  trait :like do
    likes { [FactoryBot.build(:like, :idea), FactoryBot.build(:like, :comment)] }
  end

  trait :comment do
    comments { [FactoryBot.build(:comment)] }
  end
end
