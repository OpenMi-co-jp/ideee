# ideee
An application for ideas and engineers
## versions

* System dependencies

# DB

|Users||
|:-:|:-:|
|id|string|
|name|string|
|description|text|
|point|integer|
|idea|bool|
|maker|bool|
|idea_id|string|
|comment_id|string|
|twitter_id||

|idea||
|:-:|:-:|
|name|string|
|icon|image|
|note|text|
|views|integer|
|user_id|string|

|discussion||
|:-:|:-:|
|name|name|
|icon|image|
|comment_id|string|

|comment||
|:-:|:-:|
|description|text|
|type|string|(idea or discussion)
|user_id|string|
|like_id|string|

|user_comment_like||
|:-:|:-:|
|user_id|name|
|comment_id||

|user_idea_like||
|:-:|:-:|
|user_id|name|
|comment_id||
