# frozen_string_literal: true

module ReservedEmail
  extend ActiveSupport::Concern

  require 'sendgrid-ruby'
  include SendGrid

  def send_heart_ranking_and_new_idea(commented_ideas, new_ideas)
    body = "
            <p>日頃からideeeをお使い頂きありがとうございます！</p>
            <span style='font-weight: bold;'>おかげさまで、現在のアイデア数</span>
            <span style='color: #FF862E; font-size:x-large'> #{Idea.all.length} </span>
            <h3 style='color: #FF862E;'>最新の新着アイデア💡</h3>
            #{new_idea_colum(new_ideas)}
            <h3 style='color: #FF862E;'>最近コメントが多かったアイデアベスト10💬</h3>
            #{ranking_idea(commented_ideas)}
            <hr>
            <p>アプリ自体も常にアップデートされています！ぜひチェック！</p>
           "
    subject = '【ideee】新着アイデア💡&最近コメントが多かったアイデアベスト10💬'
    content = Content.new(type: 'text/html', value: html_frame(body, 'ranking'))
    User.weekly_emailable.map do |user|
      to = Email.new(email: user&.email)
      mail = Mail.new(@from, subject, to, content)
      @sg.client.mail._('send').post(request_body: mail.to_json)
    end
  end

  def likes(email_to, notifications, action_users)
    body = "
        <b>アイデアに需要があるようです！</b>
        <hr>
        <h4>ハートを送られたアイデア</h4>
        #{idea_list(notifications.map(&:idea))}
        <h4>ハートを送ってくれた人</h4>
        #{user_link_list(action_users)}
      "
    subject = '【ideee】ハートのお知らせ 💛'
    content = Content.new(type: 'text/html', value: html_frame(body, 'likes'))

    to = Email.new(email: email_to)
    mail = Mail.new(@from, subject, to, content)
    @sg.client.mail._('send').post(request_body: mail.to_json)
  end

  private

  def ranking_idea(commented_ideas)
    str = ''
    commented_ideas.each.with_index(1) do |idea, index|
      str += idea_ranking_item(rank: rank(index), idea:)
    end
    str
  end

  def new_idea_colum(new_ideas)
    str = ''
    new_ideas.each.with_index(1) do |idea, i|
      str += idea_ranking_item(rank: "#{i}💡", idea:)
    end
    str
  end

  def idea_ranking_item(rank:, idea:)
    "
      <div style='background-color: white; margin: 3px 0; padding: 5px;'>
        <div style='display: inline;'>
          <b>#{rank}</b>#{analytics_url(
            "ideas/#{idea.id}", 'ranking', idea.name
          )} (💬#{idea.comments_num}) by #{idea.user.name}
        </div>
      </div>
    "
  end

  def idea_list(ideas)
    str = ''
    ideas.each do |idea|
      str += idea_item_with_like(idea)
    end
    str
  end

  def idea_item_with_like(idea)
    "
      <div style='background-color: white; margin: 3px 0; padding: 5px;'>
        <div style='display: inline;'>
          💛 #{idea.likes_num} 💬 #{idea.comments_num} #{analytics_url("ideas/#{idea.id}", 'ranking', idea.name)}
        </div>
      </div>
    "
  end

  def user_link_list(users)
    str = ''
    users.each do |user|
      str += user_icon_link(user)
    end
    str
  end

  def rank(index)
    case index
    when 1
      "#{index}位👑"
    when 2
      "#{index}位🥈"
    when 3
      "#{index}位🥉"
    else
      "#{index}位 "
    end
  end
end
