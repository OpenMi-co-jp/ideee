require 'rails_helper'

# ユーザー入力が公式メール・Slack・X投稿・保存データに不正に差し込まれないことを確認する
RSpec.describe 'ユーザー入力の差し込み対策', type: :request do
  describe 'User の SNS ID と URL' do
    it 'X の URL からユーザー名だけを保存する' do
      user = create(:user, twitter_id: 'https://x.com/ideee_tech/')
      expect(user.twitter_id).to eq('ideee_tech')
    end

    it 'GitHub の URL からユーザー名だけを保存する' do
      user = create(:user, github_id: 'https://github.com/openmi-co/ideee')
      expect(user.github_id).to eq('openmi-co')
    end

    it 'リンク記法などを含む twitter_id は保存できない' do
      user = build(:user, twitter_id: 'a) [公式](https://evil.example')
      expect(user).not_to be_valid
    end

    it 'http(s) 以外の remote_url は保存できない' do
      user = build(:user, remote_url: "x' onerror='alert(1)")
      expect(user).not_to be_valid
    end

    it '既存の値が変わらなければ検証しない' do
      user = create(:user)
      user.twitter_id = 'legacy value'
      user.save!(validate: false)
      expect(user.reload.update(name: 'renamed')).to be true
    end
  end

  describe 'Message' do
    it '5000文字を超える本文は保存できない' do
      expect(build(:message, content: 'a' * 5001)).not_to be_valid
    end
  end

  describe 'SendEmail' do
    let(:mailer) { SendEmail.allocate }

    it 'ユーザー名をエスケープしてアイコン画像に埋め込む' do
      user = build(:user, name: "<a href='//evil'>x</a>", remote_url: 'https://example.com/a.png')
      expect(mailer.__send__(:user_image, user)).not_to include('<a ')
    end

    it 'ランキングのアイデア名とユーザー名をエスケープする' do
      idea = build(:idea, id: 1, name: '<a href=//evil>login</a>', user: build(:user, name: '<b>x</b>'))
      html = mailer.__send__(:idea_ranking_item, rank: '1位', idea:)
      expect(html).to include('&lt;a href=//evil&gt;login&lt;/a&gt;')
      expect(html).not_to include('<b>x</b>')
    end
  end

  describe 'SlackNotifier' do
    it 'メンションやリンク記法をエスケープする' do
      expect(SlackNotifier.allocate.__send__(:escape, '<!channel> <https://evil|公式>')).to eq('&lt;!channel&gt; &lt;https://evil|公式&gt;')
    end
  end

  describe 'GraphQL のリクエストサイズ' do
    it '上限を超えるリクエストは処理しない' do
      post graphql_path, params: { query: '{ userCount }', variables: { pad: 'a' * 9.megabytes }.to_json }, as: :json
      expect(response).to have_http_status(:content_too_large)
    end
  end

  describe 'ImageUploader' do
    it '5MBを超える画像は保存できない' do
      expect(ImageUploader.new.size_range.max).to eq(5.megabytes)
    end
  end
end
