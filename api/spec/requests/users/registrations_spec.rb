require 'rails_helper'

RSpec.describe 'セッション' do
  describe 'POST /users' do
    let(:user_params) do
      {
        registration: {
          email: 'example@example.com',
          password: 'password',
          password_confirmation: 'password'
        }
      }
    end

    it '新規ユーザーを作成する' do
      register = expect do
        post user_registration_path, params: user_params
      end
      register.to change(User, :count).by(1)

      expect(response).to have_http_status(:ok)
    end
  end

  describe 'POST /users/sign_in' do
    subject(:auth_sign_in) do
      post user_session_path, params: {
        email: 'user@example.com',
        password: auth_password
      }
    end

    let!(:user) { create(:user, email: 'user@example.com', password:) }

    context 'パスワードの長さが下限（6文字）の場合' do
      let(:password) { 'pass12' }
      let(:auth_password) { 'pass12' }

      it '認証に成功する' do
        auth_sign_in
        expect(response).to have_http_status(:ok)
        expect(response.headers['authorization']).to be_present
      end
    end

    context 'パスワードの長さが上限（128文字）の場合' do
      let(:password) { 'p' * 128 }
      let(:auth_password) { 'p' * 128 }

      it '認証に成功する' do
        auth_sign_in
        expect(response).to have_http_status(:ok)
        expect(response.headers['authorization']).to be_present
      end
    end

    context 'パスワードが違う場合' do
      let(:password) { 'password' }
      let(:auth_password) { 'wrong_password' }

      it '認証に失敗する' do
        auth_sign_in
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end

  describe 'DELETE /users/sign_out' do
    let(:user) { create(:user) }
    let(:tokens) { sign_in(user) }

    it 'ユーザーをログアウトする' do
      delete destroy_user_session_path, headers: tokens
      expect(response).to have_http_status(:ok)
    end
  end
end
