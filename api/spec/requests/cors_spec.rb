require 'rails_helper'

RSpec.describe 'CORS / Origin check' do
  subject(:request_token) { post '/csrf_token', headers: { 'Origin' => origin, 'X-Requested-With' => 'XMLHttpRequest' } }

  context '許可されたオリジンのとき' do
    let(:origin) { 'https://ideee.tech' }

    it 'CSRFトークンとCORSヘッダを返す' do
      request_token
      expect(response).to have_http_status(:ok)
      expect(response.headers['Access-Control-Allow-Origin']).to eq(origin)
    end
  end

  context 'Vercel のプレビュー（本番以外）のとき' do
    let(:origin) { 'https://ideee-abc123def-narucel.vercel.app' }

    it '許可する' do
      request_token
      expect(response).to have_http_status(:ok)
    end
  end

  context '許可パターンを末尾に含む別ドメインのとき' do
    let(:origin) { 'https://ideee-x-narucel.vercel.app.evil.example' }

    it '拒否し、CORSヘッダも付けない' do
      request_token
      expect(response).to have_http_status(:forbidden)
      expect(response.headers['Access-Control-Allow-Origin']).to be_nil
    end
  end

  context '許可パターンを途中に含む別ドメインのとき' do
    let(:origin) { 'https://evil.example/ideee-x-narucel.vercel.app' }

    it '拒否する' do
      request_token
      expect(response).to have_http_status(:forbidden)
    end
  end
end
