namespace :auto_update_qiita_post do

  def make_body
    body = "## 今月の個人開発に使えるアイデアを人気順に抽出！\n" + \
      "## 🎯 ターゲット\n" + \
      "- 個人開発のアイデアが欲しい人\n" + \
      "- 自分のプロダクトを改善していきたい人人\n" + \
      "- シンプルに他人のアイデアが気になる人\n\n" + \
      "```\n" + \
      "アイデアとエンジニアのマッチングアプリ ideeeの最新アイデアを投稿中！\n"+ \
      "```\n" + \
      "https://www.ideee.tech/about?utm_source=qiita&utm_medium=post&utm_id=auto_post\n\n" + \
      "## 🏆 ランキング（コメント）\n"

    # アイデア一括取得
    ideas = Idea.all
    # コメントランキングの作成
    selected_items = ideas.recent_select.most_commented.first(10)
    body += idea_columns(selected_items)

    body += "## 🚀 新しいアイデア\n"

    new_items = ideas.recent_select.order(published_at: "DESC").first(10)
    body += idea_columns(new_items, new: true)

    body += "## 👬 開発者募集中のアイデア\n"
    cooperation_items = ideas.where(cooperation: :ongoing).most_commented.order(updated_at: "DESC").first(5)
    body += idea_columns(cooperation_items)

    body += "```\n\n" + \
      "ideeeはサービス開発の「もったいない」を無くすために努力していきます。\n" + \
      "よろしければLGTMなどで応援よろしくお願いします🙇‍♂️\n" + \
      "```\n\n" + \
      "## 自己紹介\n" + \
      "なる　　Twitter: [@1026NT](https://twitter.com/1026NT)\n" + \
      "個人開発で発信中！フォローください！👏\n" + \
      "<img src=\"https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/498701/3db40e7d-3213-be1f-8650-c6ad5dff69c9.jpeg\" width=\"250px\">\n"

    body
  end

  def rank(num)
    case num
    when 1 then
      rank = "🥇 1"
    when 2 then
      rank = "🥈 2"
    when 3 then
      rank = "🥉 3"
    else
      rank = num
    end
    rank
  end

  def analytics_url(id)
    "https://www.ideee.tech/ideas/#{id}?utm_source=qiita_auto_post&utm_medium=post&utm_id=#{id}"
  end

  def idea_columns(items, new: false)
    num = 1
    body = ''
    items.map{ |item|
      body += "### #{new ? num : rank(num)}. [#{item.name}](#{analytics_url(item.id)})\n"
      body += "**💛 : #{item.likes_num}　　💬 : #{item.comments_num}**　　📮 : #{item.published_at.strftime("%Y / %m / %d")}\n"

      if item.idea_tags.length > 0
        item.idea_tags.map{|a| body += "`#{a.name}` " }
        body += "\n"
      end
      body += "#{item.user.name}さん　　"

      twitter_id = item.user.twitter_id
      body += "Twitter: [@#{twitter_id}](https://twitter.com/#{twitter_id})" if twitter_id.present?
      body += "\n<img src=\"#{item.icon.to_s}\" height=\"150px\">\n" if item.icon.present?
      body += "\n"
      num += 1
    }
    body
  end

  desc 'Qiitaの記事を自動投稿'
  task update_recent_ideas: :environment do
    require 'httpclient'

    post_id = '0ef4b963434226eacb6b'
    title = "アイデア総数【#{Idea.all.length}】個人開発アイデアまとめ【毎日更新】"

    url = "https://qiita.com/api/v2/items/#{post_id}"
    header = {
      "Authorization" => "Bearer #{Rails.application.credentials.dig(:qiita, :access_token)}",
      "Content-Type" => "application/json"
    } # 例) ヘッダーに"Bearer xxxxx"を付与
    body = {
      body: make_body,
      title: title
    }.to_json
    client = HTTPClient.new
    begin
      response = client.patch(url, header: header, body: body) #headerとqueryを指定
      # HTTPステータスコードを表示
      puts "Get stocks Status code #{response.code.to_i}"
      if response.code.to_i != 200
        SlackNotifier.new.send_error_report('Qiita自動投稿', response.http_header.reason_phrase)
      end
    rescue => e
      puts "============rescue error #{e}========"
      SlackNotifier.new.send_error_report('Qiita自動投稿', e)
    end
  end
end
