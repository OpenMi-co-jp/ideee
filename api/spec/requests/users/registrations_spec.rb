require 'rails_helper'

RSpec.describe 'セッション' do
  describe 'POST /auth' do
    let(:user_params) do
      {
        email: 'example@example.com',
        password: 'password',
        password_confirmation: 'password'
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

  describe 'POST /auth/sign_in' do
    subject(:sign_in) do
      post user_session_path, params: {
        email: 'user@example.com',
        password:
      }
    end

    before { create(:user, email: 'user@example.com', password:) }

    context 'パスワードの長さが下限（6文字）の場合' do
      let(:password) { 'pass12' }

      it '認証に成功する' do
        sign_in
        expect(response).to have_http_status(:ok)
        expect(response.headers['client']).to be_present
        expect(response.headers['access-token']).to be_present
        expect(response.headers['uid']).to be_present
        expect(response.headers['authorization']).to be_present
      end
    end

    context 'パスワードの長さが上限（128文字）の場合' do
      let(:password) { 'p' * 128 }

      it '認証に成功する' do
        sign_in
        expect(response).to have_http_status(:ok)
        expect(response.headers['client']).to be_present
        expect(response.headers['access-token']).to be_present
        expect(response.headers['uid']).to be_present
        expect(response.headers['authorization']).to be_present
      end
    end
  end

  describe 'DELETE /auth/sign_out' do
    let(:user) { create(:user) }

    before { post user_session_path, params: { email: user.email, password: user.password } }

    let(:auth_tokens){ response.headers.slice('client', 'access-token', 'uid', 'authorization') }

    it 'ユーザーをログアウトする' do
      delete destroy_user_session_path, headers: auth_tokens
      expect(response).to have_http_status(:ok)
    end
  end
end
