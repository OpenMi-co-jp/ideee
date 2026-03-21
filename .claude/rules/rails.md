---
paths:
  - "api/**/*.rb"
  - "api/**/*.erb"
---

# Rails 開発ルール

## コード規約

- Rubocop のルールに従う
- N+1 クエリを避ける（Bullet gem で検出）
- `includes`, `preload`, `eager_load` を適切に使用

## GraphQL

- Resolver は `api/app/graphql/resolvers/` に配置
- Type は `api/app/graphql/types/` に配置
- Mutation は `api/app/graphql/mutations/` に配置

## テスト

- モデルのテストは `api/spec/models/` に配置
- ファクトリは `api/spec/factories/` に配置
- RSpec の `let` と `let!` を適切に使い分ける

## セキュリティ

- ユーザー入力は必ずバリデーション
- SQL インジェクションに注意（プレースホルダを使用）
- Brakeman で定期的にチェック

## ジョブ

- Sidekiq ジョブは `api/app/jobs/` に配置
- 冪等性を意識して実装
