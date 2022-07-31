module EventEmail
  extend ActiveSupport::Concern

  require 'sendgrid-ruby'
  include SendGrid

  def initialize
    @from = Email.new(email: 'ideee.info@gmail.com') # SendGridの管理画面でSenderに登録したアドレス
    @sg = SendGrid::API.new(api_key: Rails.application.credentials.dig(:sendgrid, :api_key))
  end

    def event_new_year
      body = "
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
            "

      subject = 'ideee初のお年玉キャンペーン🎍10日間の盛り上がり'
      content = Content.new(type: 'text/html', value: html_frame(body, 'event_mail'))

      User.find_each.map do |user|
        to = Email.new(email: user&.email)
        mail = Mail.new(@from, subject, to, content)
        response = @sg.client.mail._('send').post(request_body: mail.to_json)
      end

    end

    def event_valentine
      body = "
              <a href='https://www.ideee.tech/events/valentine?utm_source=event_mail&utm_medium=mail&utm_id=valentine' target='_blank'>
                <img src='https://ideee-bucket.s3.ap-northeast-1.amazonaws.com/valentine_event.png' style='max-height: 400px; margin: 0 auto;'>
              </a>
              <h4 style='color: #FF862E;'>🍫ideeeバレンタイン1ヶ月キャンペーン🍫</h4>
              <hr>
              <h3>キャンペーン内容</h3>
              <ul style='font-size: 1.3rem;'>
                <li style='font-size: 2.5rem; color: #FF862E;'>GODIVA ギフト券3000円分</li>
                <li style='margin-bottom: 40px; text-decoration: underline #FF862E;'>🥇アイデアが盛り上がったで賞 １名</li>
                <li style='font-size: 2rem; color: #D9C2AD;'>スタバ ギフトチケット1000円</li>
                <li style='margin-bottom: 40px; text-decoration: underline #FF862E;'>🥈アイデアを実現した人先着 2名</li>
                <li style='font-size: 1.5rem; color: #FFBF85;'>ハーゲンダッツ ギフト券</li>
                <li style='margin-bottom: 40px; text-decoration: underline #FF862E;'>🥉アイデア投稿から抽選 2名</li>
                <li style='font-size: 1.5rem; color: #FFBF85;'>ブラックサンダー ギフト券</li>
                <li style='margin-bottom: 40px; text-decoration: underline #FF862E;'>🥉コメント投稿から抽選 2名</li>
              </ul>
              <h3>キャンペーン期間</h3>
              <div style='background-color: #F5F5F5; padding: 10px 5px;'>
                2022年1月17日(月)〜2022年2月16日(水)
              </div>
              <h3>キャンペーン対象の条件</h3>
              <ul style='margin-bottom: 40px;'>
                <li style='font-size: 1.5rem; color: #1B9DF0;'>1. Twitter IDをプロフィールに登録</li>
                <li style='font-size: 1.5rem;'>2. 「バレンタイン」のタグをつけてアイデアを投稿🍫</li>
                <span>もしくは</span>
                <li style='font-size: 1.5rem;'>2. バレンタインのアイデアにコメントを投稿💬</li>
              </ul>
              <h4>
                #{analytics_url('events/valentine', 'event_mail', '詳細はこちらのキャンペーンページにて')}
              </h4>
            "

      subject = '🍫ideeeバレンタインキャンペーン🍫'
      content = Content.new(type: 'text/html', value: html_frame(body, 'event_mail'))

      User.find_each.map do |user|
        to = Email.new(email: user&.email)
        mail = Mail.new(@from, subject, to, content)
        response = @sg.client.mail._('send').post(request_body: mail.to_json)
      end

    end

  end
end
