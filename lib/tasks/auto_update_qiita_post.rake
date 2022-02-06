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
      body += "**💬 : #{item.comments_num}**　　📮 : #{item.published_at.strftime("%Y/%m/%d")}\n"

      if item.idea_tags.length > 0
        item.idea_tags.map{|a| body += "`#{a.name}` " }
        body += "\n"
      end
      body += "#{item.user.name}さん　　"

      twitter_id = item.user.twitter_id
      body += "Twitter: [@#{twitter_id}](https://twitter.com/#{twitter_id})" if twitter_id.present?
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
    header = { "Authorization" => "Bearer #{Rails.application.credentials.dig(:qiita, :access_token)}" } # 例) ヘッダーに"Bearer xxxxx"を付与
    query = {
      body: make_body,
      title: title
    }
    client = HTTPClient.new
    response = client.patch(url, header: header, query: query) #headerとqueryを指定

    # HTTPステータスコードを表示
    puts "Get stocks Status code #{response.code.to_i}"
  end
end
