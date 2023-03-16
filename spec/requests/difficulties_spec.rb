# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Difficulties' do
  let!(:user) { FactoryBot.create(:user) }
  let(:idea)  { FactoryBot.create(:idea) }

  before { sign_in user }

  describe 'POST #create' do
    subject(:create_difficultys) { post difficultys_path, params: { idea_id: idea.id, level: Difficulty.levels.keys.sample } }

    context 'パラメータが妥当な場合' do
      it 'リクエストが成功すること' do
        create_difficultys
        expect(response).to have_http_status :found
      end

      it 'ハートが送られること' do
        expect do
          create_difficultys
        end.to change(Difficulty, :count).by(1)
      end
    end
  end
end
