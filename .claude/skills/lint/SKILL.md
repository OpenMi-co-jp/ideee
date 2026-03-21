---
name: lint
description: Linter を実行してコードを整形
allowed-tools: Bash, Read
---

# Lint 実行スキル

## Rails (Rubocop)

```bash
cd api
bundle exec rubocop -a
```

特定ファイル:
```bash
bundle exec rubocop -a path/to/file.rb
```

## フロントエンド (ESLint + Prettier)

```bash
cd front
npm run lint-autofix
npm run format
```

## セキュリティチェック (Brakeman)

```bash
cd api
bundle exec brakeman
```
