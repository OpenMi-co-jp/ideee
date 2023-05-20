# frozen_string_literal: true

module Types
  class UserType < Types::BaseObject
    field :id, ID, null: false, description: 'ユーザーID'
    field :email, String, description: 'メールアドレス'
    field :defined, Boolean, description: '設定完了フラグ'
    field :definition, Integer, description: 'タイプ'
    field :description, String, description: '自己紹介'
    field :icon, String, description: 'アイコン'
    field :name, String, description: 'ユーザー名'
    field :point, Integer, description: 'ポイント数'
    field :remote_url, String, description: 'アイコンURL'
    field :site_url, String, description: 'サイトURL'
    field :twitter_id, String, description: 'TwitterID'
    field :github_id, String, description: 'githubID'
    field :ideas_num, Integer, description: 'アイデア数'
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false, description: '作成日'
  end
end
