require 'rails_helper'

RSpec.describe Idea, type: :model do
  it 'モデルの作成が有効であること' do
    expect(build(:idea)).to be_valid
  end

  describe 'validations' do
    it 'nameがなかったら、ユーザー登録に失敗すること' do
      idea = build(:idea, name: nil)
      idea.valid?
      expect(idea.errors[:name]).to include("を入力してください")
    end

    it 'nameが51文字以上あればユーザー登録に失敗すること' do
      idea = build(:idea, name: 'a' * 51)
      idea.valid?
      expect(idea.errors[:name]).to include("は50文字以内で入力してください")
    end

    it 'noteがなかったら、ユーザー登録に失敗すること' do
      idea = build(:idea, note: nil)
      idea.valid?
      expect(idea.errors[:note]).to include("を入力してください")
    end
  end
end
