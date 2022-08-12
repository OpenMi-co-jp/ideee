class SendEmail
  require 'sendgrid-ruby'
  include SendGrid

  # イベント用に作ったメールを待避
  include EventEmail

  # 時間指定されたメールを待避
  include ReservedEmail

  def initialize
    @from = Email.new(email: 'ideee.info@gmail.com') # SendGridの管理画面でSenderに登録したアドレス
    @sg = SendGrid::API.new(api_key: Rails.application.credentials.dig(:sendgrid, :api_key))
  end

  def comment(users, commenter, idea, description)
    body = "
            <p>
              気になるコメントが来ました！さっそく反応してみましょう！
            </p>
            <hr>
            <b>コメンター名:</b>
            <div style='background-color: #F5F5F5; padding: 10px 5px;'>
              #{analytics_url('users/' + commenter.id.to_s, 'comment', commenter.name)}
            </div>
            <b>コメント内容:</b>
            <div style='background-color: #F5F5F5; padding: 10px 5px;'>
              #{xss_support(description)}
            </div>
            <p>アイデアページに飛ぶ: #{analytics_url('ideas/' + idea.id.to_s, 'comment',
                                                     'https://www.ideee.tech/ideas/' + idea.id.to_s)}</p>
          "
    subject = "【ideee】【#{idea.name}】にコメントがきました💡"
    content = Content.new(type: 'text/html', value: html_frame(body, 'comment'))

    if users.instance_of?(Array) # 送信したいアドレスが複数の時
      users.map do |user|
        to = Email.new(email: user&.email)
        mail = Mail.new(@from, subject, to, content)
        @sg.client.mail._('send').post(request_body: mail.to_json)
      end
    else # 送信したいアドレスが一つの時
      to = Email.new(email: users&.email)
      mail = Mail.new(@from, subject, to, content)
      @sg.client.mail._('send').post(request_body: mail.to_json)
    end
  end

  def join_team(user, idea)
    body = "
            <p>チーム開発の希望者がいます。さっそく連絡してみましょう！</p>
            <hr>
            <b>応募者情報</b>
            <div style='background-color: #F5F5F5; padding: 10px 5px;'>
              名前: #{user.name}<br>
              URL: #{analytics_url('users/' + user.id.to_s, 'join_team',
                                   'https://www.ideee.tech/users/' + user.id.to_s)}
            </div>
            <p>アイデアページに飛ぶ: #{analytics_url('ideas/' + idea.id.to_s, 'join_team',
                                                     'https://www.ideee.tech/ideas/' + idea.id.to_s)}</p>
          "
    subject = "【ideee】【#{idea.name}】に開発参加希望者がいます🚀"
    content = Content.new(type: 'text/html', value: html_frame(body, 'join_team'))

    to = Email.new(email: idea.user.email)
    mail = Mail.new(@from, subject, to, content)
    @sg.client.mail._('send').post(request_body: mail.to_json)
  end

  def confirm_apply(idea)
    body = "
            <p>プロダクトのURL承認申請をお受け取り致しました。</p>
            <p>URLの確認を行いますので承認まで今しばらくお待ちください。</p>
            <hr>
            <b>アイデア情報</b>
            <div style='background-color: #F5F5F5; padding: 10px 5px;'>
              アイデア名: #{idea.name}<br>
              承認待ちURL: #{idea.product_url}
            </div>
            <p>アイデアページに飛ぶ: #{analytics_url('ideas/' + idea.id.to_s, 'confirm_apply',
                                                     'https://www.ideee.tech/ideas/' + idea.id.to_s)}</p>
          "
    subject = "【ideee】【#{idea.name}】のURL承認申請を受信しました🙇‍♂️"
    content = Content.new(type: 'text/html', value: html_frame(body, 'join_team'))

    to = Email.new(email: idea.user.email)
    mail = Mail.new(@from, subject, to, content)
    @sg.client.mail._('send').post(request_body: mail.to_json)
  end

  def draft_remind(user_id, idea_id)
    idea = Idea.find(idea_id)
    body = "
            <p>
              眠っているアイデアがあります。<br>
              せっかくなので編集・公開してみませんか？
            </p>
            <b>あなたの下書き💡</b>
            <p>名前: #{idea.name}</p>
            <p>作成日: #{idea.created_time}</p>
            <p>
              URL: #{analytics_url('ideas/' + idea_id.to_s, 'draft_remind',
                                   'https://www.ideee.tech/ideas/' + idea_id.to_s)}
            </p>
          "

    subject = '【ideee】下書きのままで眠っているアイデアを助けよう！'
    content = Content.new(type: 'text/html', value: html_frame(body, 'draft_remind'))

    user_email = User.find(user_id).email
    to = Email.new(email: user_email)
    mail = Mail.new(@from, subject, to, content)
    @sg.client.mail._('send').post(request_body: mail.to_json)
  end

  def notification_message(team_members, sender, message)
    body = "
            <p>
              チーム開発メンバーからメッセージが来ています。<br>
              確認しましょう！
            </p>
            <hr>
            <b>メッセージ送信者:</b>
            <div style='background-color: #F5F5F5; padding: 10px 5px; margin-bottom: 20px'>
              #{analytics_url('users/' + sender.id.to_s, 'notification_message', sender.name)}
            </div>
            <b>メッセージ内容:</b>
            <div style='background-color: #F5F5F5; padding: 10px 5px;'>
              #{message.content.body}
            </div>
            <p>メッセージページに飛ぶ: #{analytics_url('rooms/' + message.room_id.to_s, 'notification_message',
                                                       'https://www.ideee.tech/rooms/' + message.room_id.to_s)}</p>
          "

    subject = '【ideee】チーム開発メンバーからメッセージが来ました📮'
    content = Content.new(type: 'text/html', value: html_frame(body, 'notification_message'))

    team_members.map do |member|
      to = Email.new(email: member&.email)
      mail = Mail.new(@from, subject, to, content)
      @sg.client.mail._('send').post(request_body: mail.to_json)
    end
  end

  private

  def html_frame(body, source)
    "
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
    "
  end

  def analytics_url(path, source, content)
    "
      <a href='https://www.ideee.tech/#{path}?utm_source=#{source}&utm_medium=mail&utm_id=#{path}', target: '_blank'>#{content}</a>
    "
  end

  def xss_support(text)
    text.gsub(/\R/, '<br>')
        .gsub(/&/, '&amp;')
        .gsub(/</, '&lt;')
        .gsub(/>/, '&gt;')
        .gsub(/"/, '&quot;')
        .gsub(/'/, '&#39;')
        .gsub(/&lt;br&gt;/, '<br>') # 改行だけは反映されるように設定
  end
end
