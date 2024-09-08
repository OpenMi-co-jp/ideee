# frozen_string_literal: true

module Types
  class Idea::IdeaType < Types::BaseObject
    field :id, ID, null: false, description: 'アイデアID'
    field :user_id, Integer, null: false, description: 'ユーザーID'
    field :goal, String, description: 'ゴール'
    field :background, String, description: '背景'
    field :comments_num, Integer, description: 'コメント数'
    field :difficulty, String, description: '難易度'
    field :draft, Boolean, description: '下書きフラグ'
    field :emailed_at, GraphQL::Types::ISO8601DateTime, description: 'メール送信日'
    field :hypothesis, String, description: '仮説'
    field :icon_url, String, description: 'アイコンURL'
    field :issue, String, description: '課題・困っていること'
    field :likes_num, Integer, description: 'ハート数'
    field :monetize, String, description: 'マネタイズ方法'
    field :name, String, null: false, description: 'アイデア名'
    field :note, String, description: '補足'
    field :product_apply, String, description: 'アプリ審査状況'
    field :github_url, String, description: 'GithubリポジトリURL'
    field :product_url, String, description: '作っているアプリのURL'
    field :similar, String, description: '類似サービス'
    field :stance, String, description: '権利スタンス'
    field :target, String, description: 'ターゲット'
    field :view, Integer, description: 'ビュー数'
    field :wish_function, String, description: '欲しい機能'
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false, description: '作成日'
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false, description: '更新日'
    field :published_at, GraphQL::Types::ISO8601DateTime, description: '公開日'

    field :team_status, String, null: true, description: 'チームステータス'

    field :user, Types::UserType, null: false, description: 'ユーザーオブジェクト'
    field :idea_tags, [Types::TagType], null: true, description: 'タグオブジェクト'
    field :team, Types::TeamType, null: true, description: 'チームオブジェクト'
    field :comments, [Types::CommentType], null: false, description: 'コメントリスト'
    field :likes, [Types::LikeType], null: false, description: 'いいねリスト'
    field :reviews, [Types::ReviewType], null: false, description: 'レビューリスト'
  end
end
