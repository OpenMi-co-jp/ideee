require 'rails_helper'

RSpec.describe 'Users', type: :request do
  let!(:user) { FactoryBot.create(:user) }

  describe 'GET #index' do
    subject { get users_path }

    it 'リクエストが成功すること' do
      subject
      expect(response.status).to eq 200
    end

    it 'ユーザーの名前が表示されていること' do
      subject
      expect(response.body).to include user.name
    end
  end

  describe 'GET #show' do
    subject { get user_path(user) }

    context 'ユーザーが存在する場合' do
      it 'リクエストが成功すること' do
        subject
        expect(response.status).to eq 200
      end

      it 'ユーザーの名前が表示されていること' do
        subject
        expect(response.body).to include user.name
      end
    end

    context 'ユーザーが存在しない場合' do
      subject { -> { get user_path(user.id + 100) } }

      it { is_expected.to raise_error ActiveRecord::RecordNotFound }
    end
  end

  describe 'GET #search' do
    subject { get search_users_path, params: params }

    let!(:idea_man) { FactoryBot.create(:user, :idea_man) }
    let(:params) { {} }
    let!(:engineer) { FactoryBot.create(:user, :engineer) }
    let!(:idea_engineer) { FactoryBot.create(:user, :idea_engineer) }

    describe '検索項目を指定しない場合' do
      it 'リクエストが成功すること' do
        subject
        expect(response.status).to eq 200
      end
    end

    describe 'ユーザー項目を指定する場合(アイデア/エンジニアは常に表示される)' do
      context 'アイデアマンを検索する場合' do
        let(:params) { { 'q[definition_eq_any][]': [0, 2] } }

        it 'ユーザーが表示されていること' do
          subject
          expect(response.body).to include idea_man.name
          expect(response.body).not_to include engineer.name
          expect(response.body).to include idea_engineer.name
        end
      end

      context 'エンジニアを検索する場合' do
        let(:params) { { 'q[definition_eq_any][]': [1, 2] } }

        it 'ユーザーが表示されていること' do
          subject
          expect(response.body).not_to include idea_man.name
          expect(response.body).to include engineer.name
          expect(response.body).to include idea_engineer.name
        end
      end

      context 'アイデアマン/エンジニアを検索する場合' do
        let(:params) { { 'q[definition_eq_any]': 2 } }

        it 'ユーザーが表示されていること' do
          subject
          expect(response.body).not_to include idea_man.name
          expect(response.body).not_to include engineer.name
          expect(response.body).to include idea_engineer.name
        end
      end
    end
  end
end
