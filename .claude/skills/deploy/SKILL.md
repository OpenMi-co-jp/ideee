---
name: deploy
description: デプロイ前チェックを実行
disable-model-invocation: true
allowed-tools: Bash, Read
---

# デプロイ前チェック

以下を順番に実行:

1. **Lint チェック**
```bash
cd api && bundle exec rubocop
cd front && npm run lint
```

2. **型チェック**
```bash
cd front && npm run type-check
```

3. **セキュリティチェック**
```bash
cd api && bundle exec brakeman
```

4. **テスト**
```bash
cd api && bundle exec rspec
```

5. **ビルド確認**
```bash
cd front && npm run build
```

全てパスしたらデプロイ可能。
