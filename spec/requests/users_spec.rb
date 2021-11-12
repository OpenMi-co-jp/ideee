require 'rails_helper'

RSpec.describe "Users", type: :request do
  let!(:user) { create(:user) }

  describe "GET #index" do
    it "リクエストが成功すること" do
      get users_path
      expect(response.status).to eq 200
    end

    it 'ユーザーの名前が表示されていること' do
      get users_path
      expect(response.body).to include user.name
    end
  end

  describe 'GET #show' do
    context 'ユーザーが存在する場合' do
      it 'リクエストが成功すること' do
        get user_path(user)
        expect(response.status).to eq 200
      end

      it 'ユーザーの名前が表示されていること' do
        get user_path(user)
        expect(response.body).to include user.name
      end
    end

    context 'ユーザーが存在しない場合' do
      subject { -> { get user_path 100 } }

      it { is_expected.to raise_error ActiveRecord::RecordNotFound }
    end
  end

  describe 'GET #search' do
  let!(:idea_man) { create(:user, :idea_man) }
  let!(:engineer) { create(:user, :engineer) }
  let!(:idea_engineer) { create(:user, :idea_engineer) }
    it 'リクエストが成功すること' do
      get search_users_path
      expect(response.status).to eq 200
    end

    it '検索した定義のユーザーが表示されていること(アイデア/エンジニアは常に表示される)' do
      get search_users_path, params: { key: 'idea_man' }
      expect(response.body).to include idea_man.name
      expect(response.body).not_to include engineer.name
      expect(response.body).to include idea_engineer.name

      get search_users_path, params: { key: 'engineer' }
      expect(response.body).to include engineer.name
      expect(response.body).not_to include idea_man.name
      expect(response.body).to include idea_engineer.name

      get search_users_path, params: { key: 'idea_engineer' }
      expect(response.body).to include idea_engineer.name
      expect(response.body).not_to include idea_man.name
      expect(response.body).not_to include engineer.name
    end
  end
end
