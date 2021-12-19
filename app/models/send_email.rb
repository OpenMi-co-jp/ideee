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

  def send_heart_ranking
    subject = "【ideee】先週の人気アイデア💡"
    body = "※このメールは自動送信メールです。\n" +
            "ideee事務局です。\n\n" +
            "先週ハートが多かったアイデアベスト20！\n\n" +
    content = Content.new(type: 'text/plain', value: body)
    sg = SendGrid::API.new(api_key: Rails.application.credentials.dig(:sendgrid, :api_key))
    users.map do |user|
      to = Email.new(email: user&.email )
      mail = Mail.new(@from, subject, to, content)
      response = sg.client.mail._('send').post(request_body: mail.to_json)
    end
  end
end
