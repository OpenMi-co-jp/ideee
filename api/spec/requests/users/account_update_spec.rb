require 'rails_helper'

RSpec.describe 'PUT /users' do
  include Warden::Test::Helpers

  subject(:update_account) { put user_registration_path, params: { user: user_params }, xhr: true }

  let(:user) { create(:user, email: 'before@example.com', password: 'password') }

  before { login_as(user, scope: :user) }

  context '現在のパスワードなしでメールアドレスを変更しようとしたとき' do
    let(:user_params) { { email: 'after@example.com' } }

    it '変更しない' do
      update_account
      expect(user.reload.unconfirmed_email).to be_nil
    end
  end

  context '現在のパスワード付きでメールアドレスを変更したとき' do
    let(:user_params) { { email: 'after@example.com', current_password: 'password' } }

    it '確認待ちのメールアドレスとして受け付ける' do
      update_account
      expect(user.reload.unconfirmed_email).to eq('after@example.com')
    end
  end

  context 'メールアドレス以外を変更したとき' do
    let(:user_params) { { name: 'renamed' } }

    it 'パスワードなしで変更できる' do
      update_account
      expect(user.reload.name).to eq('renamed')
    end
  end
end
