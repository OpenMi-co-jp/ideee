# ideee
An application for ideas and engineers

<!-- TODO Readme書く -->

## セットアップの情報

- Rails (6.1.4)
- Ruby 3.0.2p107
- mysql2 (0.5.3)

インストール方法記載予定..

## versions

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
