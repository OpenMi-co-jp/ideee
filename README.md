# ideee
An application for ideas and engineers

<!-- TODO Readme書く -->

## セットアップの情報

インストール方法記載予定..

### dockerで設定する場合

1. [DockerをPCにインストールする](https://www.docker.com/)
2. Dockerを起動させる
3. githubからローカルにクローンされていることを確認
4. ideeeのディレクトリに移動 // cd xxxx/ideee
5. コンテナを起動する
  `docker-compose build`
6. dockerコンテナ上でDB作成
  `docker-compose run web bundle exec rake db:create`
7. migrationを行いDBのカラムのセットアップ
  `docker-compose run web bundle exec rake db:migrate`
8. docker起動
  `docker-compose up`
9. docker CLI で yarn install
  `yarn install --check-files`

## versions

- Rails (6.1.4)
- Ruby 3.0.2p107
- mysql2 (0.5.3)

* System dependencies

# DB

|Users||
|:-:|:-:|
|id|string|
|name|string|
|description|text|
|point|integer|
|icon|string|
|type|integer|
|site_url|string|
|twitter_id|string|
|like_id|string|

|idea||
|:-:|:-:|
|name|string|
|icon|image|
|note|text|
|views|integer|
|user_id|string|
|like_id|string|

|discussion||
|:-:|:-:|
|name|string|
|icon|image|
|comment_id|string|

|comment||
|:-:|:-:|
|description|text|
|type|string|
|user_id|string|
|like_id|string|

|like||
|:-:|:-:|
|user_id|name|
|comment_id|string|
|idea_id|string|
|discussion_id|string|
