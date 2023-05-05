# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Users' do
  let!(:user) { FactoryBot.create(:user) }

  describe 'GET #index' do
    subject(:get_users) { get users_path }

    it 'リクエストが成功すること' do
      get_users
      expect(response).to have_http_status :ok
    end

    it 'ユーザーの名前が表示されていること' do
      get_users
      expect(response.body).to include user.name
    end
  end

  describe 'GET #show' do
    subject(:get_users) { get user_path(user) }

    context 'ユーザーが存在する場合' do
      it 'リクエストが成功すること' do
        get_users
        expect(response).to have_http_status :ok
      end

      it 'ユーザーの名前が表示されていること' do
        get_users
        expect(response.body).to include user.name
      end
    end

    context 'ユーザーが存在しない場合' do
      subject(:get_users) { get user_path(user.id + 100) }

      it 'rootにリダイレクトされ302のレスポンスが返ってくること' do
        get_users
        expect(response).to have_http_status :found
      end
    end
  end

  describe 'GET #search' do
    subject(:get_search_users) { get search_users_path, params: }

    let!(:idea_man) { FactoryBot.create(:user, :idea_man) }
    let(:params)         { {}                                       }
    let!(:engineer)      { FactoryBot.create(:user, :engineer)      }
    let!(:idea_engineer) { FactoryBot.create(:user, :idea_engineer) }

    describe '検索項目を指定しない場合' do
      it 'リクエストが成功すること' do
        get_search_users
        expect(response).to have_http_status :ok
      end
    end

    describe 'ユーザー項目を指定する場合(アイデア/エンジニアは常に表示される)' do
      context 'アイデアマンを検索する場合' do
        let(:params) { { 'q[definition_eq_any][]': [0, 2] } }

        it 'ユーザーが表示されていること' do
          get_search_users
          expect(response.body).to include idea_man.name
          expect(response.body).not_to include engineer.name
          expect(response.body).to include idea_engineer.name
        end
      end

      context 'エンジニアを検索する場合' do
        let(:params) { { 'q[definition_eq_any][]': [1, 2] } }

        it 'ユーザーが表示されていること' do
          get_search_users
          expect(response.body).not_to include idea_man.name
          expect(response.body).to include engineer.name
          expect(response.body).to include idea_engineer.name
        end
      end

      context 'アイデアマン/エンジニアを検索する場合' do
        let(:params) { { 'q[definition_eq_any]': 2 } }

        it 'ユーザーが表示されていること' do
          get_search_users
          expect(response.body).not_to include idea_man.name
          expect(response.body).not_to include engineer.name
          expect(response.body).to include idea_engineer.name
        end
      end
    end
  end

  describe 'GET #monthly_commenter' do
    subject(:get_monthly_commenter) { get monthly_commenter_users_path }

    context '直近１ヶ月にコメントしたユーザーが存在しない場合' do
      let!(:comment) { FactoryBot.create(:comment, created_at: 1.years.ago) }
      let!(:commenter) { comment.user }

      it 'リクエストが成功すること' do
        get_monthly_commenter
        expect(response).to have_http_status :ok
      end

      it 'ユーザーの情報が表示されないこと' do
        get_monthly_commenter
        expect(response.body).not_to include commenter.name
      end
    end

    context '直近1ヶ月にコメントしたユーザーが存在する場合' do
      let!(:comment) { FactoryBot.create(:comment) }
      let!(:commenter) { comment.user }

      it 'リクエストが成功すること' do
        get_monthly_commenter
        expect(response).to have_http_status :ok
      end

      it 'コメントしたユーザーの名前が表示されていること' do
        get_monthly_commenter
        expect(response.body).to include commenter.name
      end
    end
  end
end
