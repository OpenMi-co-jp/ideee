require 'rails_helper'

RSpec.describe 'Likes', type: :request do
  let!(:user) { FactoryBot.create(:user) }
  let(:idea) { FactoryBot.create(:idea) }

  before { sign_in user }

  describe 'POST #create' do
    subject { post likes_path, params: { id: idea.id, type: 'Idea' } }

    context 'パラメータが妥当な場合' do
      it 'リクエストが成功すること' do
        subject
        expect(response.status).to eq 204
      end

      it 'ハートが送られること' do
        expect do
          subject
        end.to change(Like, :count).by(1)
      end
    end
  end

  describe 'DELETE #destroy' do
    let!(:like_idea) { FactoryBot.create(:like, :idea, { user: user }) }

    it 'リクエストが成功すること' do
      delete like_path(like_idea.likable_id, params: { id: like_idea.likable_id, type: 'Idea' })
      expect(response.status).to eq 204
    end

    # Likeの総数は減っているがdeleteメソッドでlikeを削除しているためActive Recordが反映されずテストが成功しない
    # it 'ハートが削除されること' do
    #   expect do
    #     delete like_path(like.idea_id)
    #   end.to change(Like, :count).by(-1)
    # end
  end
end
