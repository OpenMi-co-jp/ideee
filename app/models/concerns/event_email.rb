module EventEmail
  extend ActiveSupport::Concern

  require 'sendgrid-ruby'
  include SendGrid

  # お年玉キャンペーンで送ったメール
  def event_new_year
    body = "
            <a href='https://www.ideee.tech/events/new_year_2023?utm_source=event_mail&utm_medium=mail&utm_id=new_year_2023' target='_blank' title='お年玉キャンペーン'>
              <img src='https://ideee-bucket.s3.ap-northeast-1.amazonaws.com/ideee_new_year_event_2023.webp' style='max-height: 400px; margin: 0 auto;' alt='お年玉キャンペーン'>
            </a>
            <h4 style='color: #FF862E;'>🎍ideeeお年玉キャンペーン🎍</h4>
            <hr>
            <h3>キャンペーン内容</h3>
            <ul style='font-size: 1.3rem;'>
              <li style='font-size: 2.5rem; color: #FF862E;'>Amazonギフト券3000円分</li>
              <li style='margin-bottom: 40px; text-decoration: underline #FF862E;'>🥇アイデアが盛り上がったで賞 １名</li>
              <li style='font-size: 2rem; color: #D9C2AD;'>Amazonギフト券1000円分</li>
              <li style='margin-bottom: 40px; text-decoration: underline #FF862E;'>🥈コメント投稿から抽選 2名</li>
              <li style='font-size: 1.5rem; color: #FFBF85;'>Amazonギフト券500円分</li>
              <li style='margin-bottom: 40px; text-decoration: underline #FF862E;'>🥉アイデア投稿から抽選 2名</li>
            </ul>
            <h3>キャンペーン期間</h3>
            <div style='background-color: #F5F5F5; padding: 10px 5px;'>
              2022年12月26日(月)〜2023年1月8日(日)
            </div>
            <h3>キャンペーン対象の条件</h3>
            <ul style='margin-bottom: 40px;'>
              <li style='font-size: 1.5rem; color: #1B9DF0;'>1. Twitter IDをプロフィールに登録</li>
              <li style='font-size: 1.5rem;'>2. アイデアを投稿💡</li>
              <span>もしくは</span>
              <li style='font-size: 1.5rem;'>2. 新規アイデアにコメントを投稿💬</li>
            </ul>
            <h4>
              #{analytics_url('events/new_year_2023', 'event_mail', '詳細はこちらのキャンペーンページにて')}
            </h4>
          "

    subject = 'ideeeお年玉キャンペーン🎍年末年始の盛り上がり'
    content = Content.new(type: 'text/html', value: html_frame(body, 'event_mail'))

    User.event_emailable.map do |user|
      to = Email.new(email: user&.email)
      mail = Mail.new(@from, subject, to, content)
      @sg.client.mail._('send').post(request_body: mail.to_json)
    end
  end

  # バレンタインキャンペーンで送ったメール
  def event_valentine
    body = "
            <a href='https://www.ideee.tech/events/valentine?utm_source=event_mail&utm_medium=mail&utm_id=valentine' target='_blank' title='バレンタインキャンペーン'>
              <img src='https://ideee-bucket.s3.ap-northeast-1.amazonaws.com/valentine_event.png' style='max-height: 400px; margin: 0 auto;' alt='バレンタインキャンペーン'>
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

    User.event_emailable.map do |user|
      to = Email.new(email: user&.email)
      mail = Mail.new(@from, subject, to, content)
      @sg.client.mail._('send').post(request_body: mail.to_json)
    end
  end
end
