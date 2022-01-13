require 'rails_helper'

RSpec.describe "Comments", type: :request do
  let!(:user) { create(:user) }
  let!(:comment) { create(:comment) }

  before { sign_in user }
  describe 'POST #create' do
    subject { post comments_path, params: params }
    context 'パラメータが妥当な場合' do
      let(:params) { { description: comment.description, idea_id: comment.idea.id } }
      it 'リクエストが成功すること' do
        subject
        expect(response.status).to eq 204
      end

      it 'コメントが登録されること' do
        expect do
          subject
        end.to change(Comment, :count).by(1)
      end
    end

    context 'パラメータが不正な場合' do
      let(:params) { { description: '', idea_id: comment.idea.id } }
      it 'コメントが登録されないこと' do
        expect do
          subject
        end.to_not change(Comment, :count)
      end
    end
  end

  describe 'DELETE #destroy' do
    subject { delete comment_path(comment) }
    it 'リクエストが成功すること' do
      subject
      expect(response.status).to eq 204
    end

    it 'コメントが削除されること' do
      expect do
        subject
      end.to change(Comment, :count).by(-1)
    end
  end
end
