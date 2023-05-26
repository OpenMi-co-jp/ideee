# frozen_string_literal: true

require 'rails_helper'

RSpec.xdescribe 'Comments' do
  let!(:user)    { FactoryBot.create(:user)    }
  let!(:comment) { FactoryBot.create(:comment) }

  before { sign_in user }

  describe 'POST #create' do
    subject(:create_comments) { post comments_path, params: }

    context 'パラメータが妥当な場合' do
      let(:params) { { description: comment.description, idea_id: comment.idea_id } }

      it 'リクエストが成功すること' do
        create_comments
        expect(response).to have_http_status :no_content
      end

      it 'コメントが登録されること' do
        expect do
          create_comments
        end.to change(Comment, :count).by(+1)
      end
    end

    context 'パラメータが不正な場合' do
      let(:params) { { description: '', idea_id: comment.idea_id } }

      it 'コメントが登録されないこと' do
        expect { create_comments }.to raise_error(ActiveRecord::RecordInvalid, 'バリデーションに失敗しました: コメントを入力してください')
      end
    end
  end

  describe 'DELETE #destroy' do
    subject(:destroy_comment) { delete comment_path(comment) }

    it 'リクエストが成功すること' do
      destroy_comment
      expect(response).to have_http_status :no_content
    end

    it 'コメントが削除されること' do
      expect do
        destroy_comment
      end.to change(Comment, :count).by(-1)
    end
  end
end
