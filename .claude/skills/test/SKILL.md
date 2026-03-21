---
name: test
description: テストを実行する
allowed-tools: Bash, Read
---

# テスト実行スキル

## Rails テスト (RSpec)

```bash
cd api
docker exec -it api-web-1 bundle exec rspec
```

特定のファイル:
```bash
docker exec -it api-web-1 bundle exec rspec spec/models/user_spec.rb
```

## フロントエンド

型チェック:
```bash
cd front && npm run type-check
```

Lint:
```bash
cd front && npm run lint
```
