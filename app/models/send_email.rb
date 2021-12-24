class SendEmail
  require 'sendgrid-ruby'
  include SendGrid

  def initialize
    @from = Email.new(email: 'ideee.info@gmail.com') # SendGridの管理画面でSenderに登録したアドレス
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

    sg = SendGrid::API.new(api_key: Rails.application.credentials.dig(:sendgrid, :api_key))
    if users.instance_of?(Array) # 送信したいアドレスが複数の時
      users.map do |user|
        to = Email.new(email: user&.email )
        mail = Mail.new(@from, subject, to, content)
        response = sg.client.mail._('send').post(request_body: mail.to_json)
      end
    else # 送信したいアドレスが一つの時
      to = Email.new(email: users&.email )
      mail = Mail.new(@from, subject, to, content)
      response = sg.client.mail._('send').post(request_body: mail.to_json)
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

  private

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

  def mail_head
    """
      <p style='color: #C4C4C4;'>※このメールは自動送信メールです。</p>
      <p>ideee事務局です。</p>
    """
  end

  def signature
    """
      <div style='padding: 5px 20px;'>
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
