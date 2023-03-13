# ideee
アイデアとエンジニアのマッチングプラットフォーム

![Heroku](https://heroku-badge.herokuapp.com/?app=ideee-tech)

<!-- TODO Readme書く -->

## アプリURL

https://www.ideee.tech/

## BIツールURL
https://ideee-metabase.herokuapp.com/

## セットアップの情報

全セットアップ方法
https://www.notion.so/ideee/Engineering-Wiki-80fac88f11804c7d86ee1ac06bcfc75f

### 静的解析ツール

Dockerfileを解析
1. インストールしていない場合
```
brew install hadolint
```
2. 解析実行
```
api % hadolint Dockerfile
```

## versions

- Rails (7.0.4)
- Ruby 3.0.2p107
- mysql2 (0.5.3)
