# ideee - アイデアとエンジニアのマッチングプラットフォーム

## プロジェクト構成

- `api/` - Rails 7.2 バックエンド (Ruby 3.2.2)
- `front/` - Next.js 14 フロントエンド (React 18 + TypeScript)

## 開発環境

### Docker 操作

```bash
# API起動
cd api && docker compose up

# コンテナに入る
docker exec -it api-web-1 bash

# ビルド
docker compose build
```

### API (Rails)

```bash
# テスト実行
bundle exec rspec

# Linter
bundle exec rubocop -a

# セキュリティチェック
bundle exec brakeman

# マイグレーション
bundle exec rails db:migrate

# コンソール
bundle exec rails c
```

### フロントエンド (Next.js)

```bash
cd front

# 開発サーバー
npm run dev

# ビルド
npm run build

# Linter
npm run lint
npm run lint-autofix

# フォーマット
npm run format

# 型チェック
npm run type-check

# GraphQL スキーマ生成
npm run compile
```

## コード規約

### Ruby/Rails

- Rubocop に従う
- RSpec でテストを書く
- GraphQL API で通信

### TypeScript/React

- ESLint + Prettier に従う
- Mantine UI を使用
- Apollo Client で GraphQL 通信
- Zod でバリデーション

## 重要なパス

- API GraphQL: `api/app/graphql/`
- API Models: `api/app/models/`
- API Jobs: `api/app/jobs/`
- Front Components: `front/src/components/`
- Front Pages: `front/src/app/`
- GraphQL 生成コード: `front/src/graphql/`

## コミットメッセージ

```
type(scope): 簡潔な説明

例:
feat(auth): ログイン機能を追加
fix(api): N+1クエリを修正
refactor(front): コンポーネントを分割
```
