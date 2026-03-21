# プロジェクト固有のルール

## Git運用ルール

- **mainブランチは使用禁止**: 新しいブランチを作成する際は、必ず`release`ブランチから作成すること
- ブランチ作成例: `git checkout release && git checkout -b feature/xxx`
- PRのベースブランチも`release`を使用すること
