# ideee
アイデアとエンジニアのマッチングプラットフォーム

<!-- TODO Readme書く -->

## セットアップの情報

全セットアップ方法
https://www.notion.so/ideee/Engineering-Wiki-80fac88f11804c7d86ee1ac06bcfc75f

### dockerで設定する場合

1. [DockerをPCにインストールする](https://www.docker.com/)
2. Dockerを起動させる
3. githubからローカルにクローンされていることを確認
4. ideeeのディレクトリに移動 // cd xxxx/ideee
5. コンテナを起動する
   `docker-compose up --build`
6. dockerコンテナ上でDB作成、DBのカラムのセットアップ、seedデータを入れる
   `docker-compose run web db:create db:migrate db:seed_fu`

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
