# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Comment do
  let(:comment) { FactoryBot.create(:comment) }

  describe 'コメントが有効になること' do
    it '有効であること' do
      expect(comment).to be_valid
    end

    describe 'over_length?メソッドテスト' do
      context 'コメント文字数が200文字の時' do
        it 'falseが返ってくること' do
          comment.description = 'あ' * 200
          expect(comment.over_length?).to be false
        end
      end

      context "コメントに \n が3つ含まれるとき" do
        it 'falseが返ってくること' do
          comment.description = "\n\n\n"
          expect(comment.over_length?).to be false
        end
      end
    end
  end

  describe 'コメントが無効になること' do
    context 'user_idがないとき' do
      it '無効であること' do
        comment.user_id = nil
        expect(comment).to be_invalid
      end
    end

    context 'コメントが空の時' do
      it '無効であること' do
        comment.description = ''
        expect(comment).to be_invalid
      end
    end

    describe 'over_length?メソッドテスト' do
      context 'コメント文字数が201の時' do
        it 'trueが返ってくること' do
          comment.description = 'あ' * 201
          expect(comment.over_length?).to be true
        end
      end

      context "コメントに \n が4つ含まれるとき" do
        it 'trueが返ってくること' do
          comment.description = "\n\n\n\n"
          expect(comment.over_length?).to be true
        end
      end
    end
  end
end
