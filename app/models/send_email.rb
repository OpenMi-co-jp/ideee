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

  def send_heart_ranking(users, liked_ideas)
    puts "test"
    subject = "【ideee】最近ハートが多かった人気アイデア💡"
    content = Content.new(type: 'text/html', value: ranking_body(liked_ideas))
    sg = SendGrid::API.new(api_key: Rails.application.credentials.dig(:sendgrid, :api_key))
    users.map do |user|
      to = Email.new(email: "" )
      mail = Mail.new(@from, subject, to, content)
      response = sg.client.mail._('send').post(request_body: mail.to_json)
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
              URL: https://www.ideee.tech/users/#{user.id}
            </div>
            <p>アイデアページに飛ぶ: https://www.ideee.tech/ideas/#{idea.id}</p>
          """
    subject = "【ideee】【#{idea.name}】に開発参加希望者がいます🚀"
    content = Content.new(type: 'text/html', value: html_frame(body))

    idea_user = User.find_by(id: idea.user_id)
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
              <a href='https://www.ideee.tech/new_year_event?utm_source=event_mail&utm_medium=mail&utm_id=new_year_event' target='_blank'>
                  詳細はこちらのキャンペーンページにて
              </a>
            </h4>
          """

    subject = "ideee初のお年玉キャンペーン🎍10日間の盛り上がり"
    content = Content.new(type: 'text/html', value: html_frame(body))

    users = User.all
    users.map do |user|
      to = Email.new(email: user&.email )
      mail = Mail.new(@from, subject, to, content)
      response = @sg.client.mail._('send').post(request_body: mail.to_json)
    end
  end

  private

  def twitter_url(user)
    if user&.twitter_id.present?
      "Twitter: <a href='https://twitter.com/#{user.twitter_id}', target: '_blank'>#{user.twitter_id}</a><br>"
    end
  end

  def ranking_body(liked_ideas)
    """
    <html>
        <body>
          <div style='background-color: #FDF8EB; padding: 10px 20px;'>
            #{mail_head}
            <p>最近ハートが多かったアイデアベスト10！</p>
            <hr>
            　#{
                liked_ideas.each do |liked_idea|
                  "#{liked_idea[:name]}"
                  "https://www.ideee.tech/ideas/#{liked_idea[:id]}"
                end
              }
            <div style='background-color: #F5F5F5; padding: 10px 5px;'>
              アイデア名:
              URL: https://www.ideee.tech/users/
            </div>
            <p>アイデアページに飛ぶ: https://www.ideee.tech/ideas/</p>
          </div>
          #{signature}
        </body>
      </html>
    """
  end

  def html_frame(body)
    """
      <html>
        <body>
          <div style='background-color: #FDF8EB; padding: 10px 20px;'>
            #{mail_head}
            #{body}
          </div>
          #{signature}
        </body>
      </html>
    """
  end

  def mail_head
    """
      <p style='color: #C4C4C4;'>※このメールは自動送信メールです。</p>
      <p>ideee事務局です。</p>
    """
  end

  def signature
    """
      <div style='margin-top: 30px; padding: 5px 20px;'>
        <b>アイデアとエンジニアのマッチングサイト ideee</b>
        <p>
          URL: https://www.ideee.tech/about<br>
          利用規約： https://www.ideee.tech/terms_of_service<br>
          プライバシーポリシー： https://www.ideee.tech/privacy_policy
        </p>
      </div>
    """
  end
end
