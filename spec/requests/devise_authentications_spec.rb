# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'DeviseAuthentications' do
  let(:user) { FactoryBot.create(:user) }

  let(:params) { { user: attributes_for(:user) } }

  let(:invalid_user_params) { { user: attributes_for(:user, name: ' ', email: ' ') } }

  describe 'POST #create' do
    before do
      ActionMailer::Base.deliveries.clear
    end

    context '正しいパラメータが入力されているとき' do
      subject(:create_user_registration) { post user_registration_path, params: }

      let(:params) { { user: attributes_for(:user) } }

      it 'リクエストが成功すること' do
        create_user_registration
        expect(response).to have_http_status :found
      end

      it '認証メールが送信されること' do
        expect { create_user_registration }.to change { ActionMailer::Base.deliveries.size }.by(1)
      end

      it 'リダイレクトされること' do
        create_user_registration
        expect(response).to redirect_to root_path
      end
    end
  end

  describe 'POST #edit' do
    subject(:edit_user_registration) { get edit_user_registration_path }

    context 'ログインしているとき' do
      before do
        user.confirm
        sign_in user
      end

      it 'リクエストが成功すること' do
        edit_user_registration
        expect(response).to have_http_status :ok
      end
    end

    context 'ゲストのとき' do
      it 'リダイレクトされること' do
        edit_user_registration
        expect(response).to redirect_to new_user_session_path
      end
    end
  end
end
