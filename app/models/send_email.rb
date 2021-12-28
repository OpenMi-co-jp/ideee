class SendEmail
  require 'sendgrid-ruby'
  include SendGrid

  def initialize
    @from = Email.new(email: 'ideee.info@gmail.com') # SendGridの管理画面でSenderに登録したアドレス
    @sg = SendGrid::API.new(api_key: Rails.application.credentials.dig(:sendgrid, :api_key))
  end

  def comment(users, idea, comment)
    subject = "【ideee】【#{idea.name}】にコメントがきました💡"
    body = "※このメールは自動送信メールです。\n" +
            "ideee事務局です。\n\n" +
            "気になるコメントが来ました！\nさっそく反応してみましょう！\n\n" +
            "---------------\n\n" +
            "#{comment}\n\n" +
            "---------------\n" +
            "https://www.ideee.tech/ideas/#{idea.id}"
    content = Content.new(type: 'text/plain', value: body)

    if users.instance_of?(Array) # 送信したいアドレスが複数の時
      users.map do |user|
        to = Email.new(email: user&.email )
        mail = Mail.new(@from, subject, to, content)
        response = @sg.client.mail._('send').post(request_body: mail.to_json)
      end
    else # 送信したいアドレスが一つの時
      to = Email.new(email: users&.email )
      mail = Mail.new(@from, subject, to, content)
      response = @sg.client.mail._('send').post(request_body: mail.to_json)
    end
  end

  def join_cooperation(user, idea)
    body = """
            <p>協働開発の希望者がいます。さっそく連絡してみましょう！</p>
            <hr>
            <b>応募者情報</b>
            <div style='background-color: #F5F5F5; padding: 10px 5px;'>
              名前: #{user.name}<br>
              #{twitter_url(user)}
              URL: #{analytics_url('users/'+user.id, 'join_cooperation', 'https://www.ideee.tech/users/'+user.id)}
            </div>
            <p>アイデアページに飛ぶ: https://www.ideee.tech/ideas/#{idea.id}</p>
          """
    subject = "【ideee】【#{idea.name}】に開発参加希望者がいます🚀"
    content = Content.new(type: 'text/html', value: html_frame(body, 'join_cooperation'))

    idea_user = User.find_by!(id: idea.user_id)
    to = Email.new(email: idea_user.email )
    mail = Mail.new(@from, subject, to, content)
    response = @sg.client.mail._('send').post(request_body: mail.to_json)
  end

  def event_new_year
    body = """
            <a href='https://www.ideee.tech/new_year_event?utm_source=event_mail&utm_medium=mail&utm_id=new_year_event' target='_blank'>
              <img src='https://ideee-bucket.s3.ap-northeast-1.amazonaws.com/event_new_year.png' style='max-height: 400px; margin: 0 auto;'>
            </a>
            <h4 style='color: #FF862E;'>🎍ideeeお年玉キャンペーン🎍</h4>
            <hr>
            <h3>キャンペーン内容</h3>
            <ul style='font-size: 1.3rem;'>
              <li style='font-size: 2.5rem; color: #FF862E;'>Amazonギフト券3000円分</li>
              <li style='margin-bottom: 40px; text-decoration: underline #FF862E;'>🥇アイデアが盛り上がったで賞 １名</li>
              <li style='font-size: 2rem; color: #D9C2AD;'>Amazonギフト券1000円分</li>
              <li style='margin-bottom: 40px; text-decoration: underline #FF862E;'>🥈コメント投稿から抽選 1名</li>
              <li style='font-size: 1.5rem; color: #FFBF85;'>Amazonギフト券500円分</li>
              <li style='margin-bottom: 40px; text-decoration: underline #FF862E;'>🥉アイデア投稿から抽選 2名</li>
            </ul>
            <h3>キャンペーン期間</h3>
            <div style='background-color: #F5F5F5; padding: 10px 5px;'>
              2021年12月26日(日)〜2022年1月5日(水)
            </div>
            <h3>キャンペーン対象の条件</h3>
            <ul style='margin-bottom: 40px;'>
              <li style='font-size: 1.5rem; color: #1B9DF0;'>1. Twitter IDをプロフィールに登録</li>
              <li style='font-size: 1.5rem;'>2. アイデアを投稿💡</li>
              <span>もしくは</span>
              <li style='font-size: 1.5rem;'>2. 新規アイデアにコメントを投稿💬</li>
            </ul>
            <h4>
              #{analytics_url('new_year_event', 'event_mail', '詳細はこちらのキャンペーンページにて')}
            </h4>
          """

    subject = "ideee初のお年玉キャンペーン🎍10日間の盛り上がり"
    content = Content.new(type: 'text/html', value: html_frame(body, 'event_mail'))

    users = User.all
    users.map do |user|
      to = Email.new(email: user&.email )
      mail = Mail.new(@from, subject, to, content)
      response = @sg.client.mail._('send').post(request_body: mail.to_json)
    end
  end

  def send_heart_ranking_and_new_idea(users, liked_ideas, new_ideas)
    body = """
            <h3 style='color: #FF862E;'>最近ハートが多かったアイデアベスト10💛</h3>
            #{ranking_idea(liked_ideas)}
            <hr>
            <h3 style='color: #FF862E;'>💡最新の新着アイデア💡</h3>
            #{new_idea_colum(new_ideas)}
           """
    subject = "【ideee】最近ハートが多かったアイデア💛最新の新着アイデア💡"
    content = Content.new(type: 'text/html', value: html_frame(body, 'ranking'))
    emails = ['t.naruhiro.1026@gmail.com', 'sayahaya1129@gmail.com']
    emails.map do |email|
    # users.map do |user|
      # to = Email.new(email: user&.email )
      
      to = Email.new(email: email )
      mail = Mail.new(@from, subject, to, content)
      response = @sg.client.mail._('send').post(request_body: mail.to_json)
    end
  end

  private

  def twitter_url(user)
    if user&.twitter_id.present?
      "Twitter: #{analytics_url(user.twitter_id, 'join_cooperation', user.twitter_id)}<br>"
    end
  end

  def html_frame(body, source)
    """
      <html>
        <body>
          <div style='background-color: #FDF8EB; padding: 10px 20px;'>
            <p style='color: #C4C4C4;'>※このメールは自動送信メールです。</p>
            <p>ideee事務局です。</p>
            #{body}
          </div>
          <div style='margin-top: 30px; padding: 5px 20px;'>
            <b>アイデアとエンジニアのマッチングサイト ideee</b>
            <p>
              URL: #{analytics_url('about', source, 'https://www.ideee.tech/about')}<br>
              利用規約： #{analytics_url('terms_of_service', source, 'https://www.ideee.tech/terms_of_service')}<br>
              プライバシーポリシー： #{analytics_url('privacy_policy', source, 'https://www.ideee.tech/privacy_policy')}
            </p>
          </div>
        </body>
      </html>
    """
  end

  def ranking_idea(liked_ideas)
    str = ''
    liked_ideas.each.with_index(1) do |idea, i|
      idea_user = User.find_by!(id: idea.user_id)
      str += idea_ranking_item(rank(i), idea, idea_user)
    end
    return str
  end

  def new_idea_colum(new_ideas)
    str = ''
    new_ideas.each.with_index(1) do |idea, i|
      idea_user = User.find_by!(id: idea.user_id)
      str += idea_ranking_item(i, idea, idea_user)
    end
    return str
  end

  def idea_ranking_item(i, idea, idea_user)
    """
      <div style='background-color: white; margin: 3px 0; padding: 5px; display: flex;'>
        <div style='display: flex;'>
          <b>#{i}　</b><a href='https://www.ideee.tech/ideas/#{idea.id}' target='_blank'>#{idea.name}</a>
          　#{tag_box(idea&.idea_tags)}　💛 #{idea.likes_num} by #{idea_user.name}
        </div>
      </div>
    """
  end

  def rank(i)
    if i == 1
      "👑第#{i}位👑"
    elsif i == 2
      "🥈第#{i}位🥈"
    elsif i == 3
      "🥉第#{i}位🥉"
    else
      "第#{i}位"
    end
  end

  def tag_box(tags)
    return if tags.nil?
    str = ''
    tags.map do |t|
      str += """
              <div style='border-radius: 5px; background-color: #F5F5F5; padding: 2px; margin: 2px; height: 20px;'>
                #{t.name}
              </div>
            """
    end
    return str
  end

  def analytics_url(path, source, content)
    """
      <a href='https://www.ideee.tech/#{path}?utm_source=#{source}&utm_medium=mail&utm_id=#{path}', target: '_blank'>#{content}</a>
    """
end

