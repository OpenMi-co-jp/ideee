require 'rails_helper'

RSpec.describe 'Difficulties', type: :request do
  let!(:user) { create(:user) }
  let(:idea) { create(:idea) }

  before { sign_in user }

  describe 'POST #create' do
    subject { post difficultys_path, params: { idea_id: idea.id, level: Difficulty.levels.keys.sample } }

    context 'パラメータが妥当な場合' do
      it 'リクエストが成功すること' do
        subject
        expect(response.status).to eq 302
      end

      it 'ハートが送られること' do
        expect do
          subject
        end.to change(Difficulty, :count).by(1)
      end
    end
  end
end
