require 'rails_helper'

RSpec.describe Like do
  let(:like_idea)    { FactoryBot.create(:like, :idea)    }
  let(:like_comment) { FactoryBot.create(:like, :comment) }

  describe 'アイデアのいいねが有効になること' do
    it 'いいねが有効であること' do
      expect(like_idea).to be_valid
    end

    it 'タイプがアイデアであること' do
      expect(like_idea.likable_type).to eq 'Idea'
    end
  end

  describe 'コメントのいいねが有効になること' do
    it 'いいねが有効であること' do
      expect(like_comment).to be_valid
    end

    it 'タイプがコメントであること' do
      expect(like_comment.likable_type).to eq 'Comment'
    end
  end

  describe 'アイデアのいいねが無効になること' do
    context 'user_idがないとき' do
      it 'いいねが無効であること' do
        like_idea.user_id = nil
        expect(like_idea).to be_invalid
      end
    end
  end

  describe 'コメントのいいねが無効になること' do
    context 'user_idがないとき' do
      it 'いいねが無効であること' do
        like_comment.user_id = nil
        expect(like_comment).to be_invalid
      end
    end
  end
end
