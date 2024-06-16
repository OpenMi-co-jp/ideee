require 'rails_helper'

RSpec.describe Review do
  let(:review) { FactoryBot.build(:review) }

  it '有効なレビューが作成できること' do
    expect(review).to be_valid
  end

  describe 'バリデーション' do
    it 'contentがなければ無効' do
      review = FactoryBot.build(:review, content: nil)
      review.valid?
      expect(review.errors[:content]).to include('を入力してください')
    end
  end

  describe 'アソシエーション' do
    it 'ideaとの関連付けがある' do
      association = described_class.reflect_on_association(:idea)
      expect(association.macro).to eq :belongs_to
    end
  end
end
