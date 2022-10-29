require 'rails_helper'

RSpec.describe Comment, type: :model do
  let(:comment) { FactoryBot.create(:comment) }

  describe "コメントが有効になること" do
    it "いいねが有効であること" do
      expect(comment).to be_valid
    end
  end

  describe "コメントが無効になること" do
    context "user_idがないとき" do
      it "無効であること" do
        comment.user_id = nil
        expect(comment).to be_invalid
      end
    end

    context "コメントが空の時" do
      it "無効であること" do
        comment.description = ""
        expect(comment).to be_invalid
      end
    end
  end
end
