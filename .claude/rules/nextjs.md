---
paths:
  - "front/**/*.tsx"
  - "front/**/*.ts"
---

# Next.js 開発ルール

## コンポーネント

- Mantine UI コンポーネントを優先使用
- Server Components と Client Components を適切に分離
- `'use client'` は必要な場合のみ

## GraphQL

- Apollo Client を使用
- クエリは `front/src/graphql/` で管理
- `npm run compile` でコード生成

## フォーム

- react-hook-form を使用
- Zod でバリデーションスキーマを定義

## スタイリング

- Mantine のスタイリングシステムを使用
- CSS Modules は避ける（Mantine に統一）

## 型安全

- `any` 型は避ける
- GraphQL コードジェネレーターの型を活用
