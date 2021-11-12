require 'rails_helper'

RSpec.describe "Comments", type: :request do
  let!(:user) { create(:user) }
  let!(:comment) { create(:comment) }

  before { sign_in user }
  describe 'POST #create' do
    context 'パラメータが妥当な場合' do
      it 'リクエストが成功すること' do
        post comments_path, params: { description: comment.description, idea_id: comment.idea.id }
        expect(response.status).to eq 204
      end

      it 'コメントが登録されること' do
        expect do
          post comments_path, params: { description: comment.description, idea_id: comment.idea.id }
        end.to change(Comment, :count).by(1)
      end
    end

    context 'パラメータが不正な場合' do
      it 'コメントが登録されないこと' do
        expect do
          post comments_path, params: { description: '', idea_id: '' }
        end.to_not change(Comment, :count)
      end
    end
  end

  describe 'DELETE #destroy' do
    it 'リクエストが成功すること' do
      delete comment_path(comment)
      expect(response.status).to eq 204
    end

    it 'コメントが削除されること' do
      expect do
        delete comment_path(comment)
      end.to change(Comment, :count).by(-1)
    end
  end
end
