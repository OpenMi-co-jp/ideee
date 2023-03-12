# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'DeviseAuthentications' do
  let(:user)                { create(:user)                                }
  let(:user_params)         { attributes_for(:user)                        }
  let(:invalid_user_params) { attributes_for(:user, name: ' ', email: ' ') }

  describe 'POST #create' do
    before do
      ActionMailer::Base.deliveries.clear
    end

    context '正しいパラメータが入力されているとき' do
      it 'リクエストが成功すること' do
        post user_registration_path, params: { user: user_params }
        expect(response).to have_http_status(:found)
      end

      it '認証メールが送信されること' do
        post user_registration_path, params: { user: user_params }
        expect(ActionMailer::Base.deliveries.size).to eq 1
      end

      it 'リダイレクトされること' do
        post user_registration_path, params: { user: user_params }
        expect(response).to redirect_to root_path
      end
    end
  end

  describe 'GET #edit' do
    # subject(:edit_user_registration_path) { get edit_user_registration_path }
    subject(:edit_user_registration) { get edit_user_registration_path }

    context 'ログインしているとき' do
      before do
        user.confirm
        sign_in user
      end

      it 'リクエストが成功すること' do
        # get edit_user_registration_path
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
