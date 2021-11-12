require 'rails_helper'

RSpec.describe "Difficulties", type: :request do
  let!(:user) { create(:user) }
  let(:idea) { create(:idea) }

  before { sign_in user }
  describe 'POST #create' do
    context 'パラメータが妥当な場合' do
      it 'リクエストが成功すること' do
        post difficultys_path, params: { idea_id: idea.id, level: Difficulty.levels.keys.sample }
        expect(response.status).to eq 302
      end

      it 'いいねが登録されること' do
        expect do
          post difficultys_path, params: { idea_id: idea.id, level: Difficulty.levels.keys.sample }
        end.to change(Difficulty, :count).by(1)
      end
    end
  end
end
