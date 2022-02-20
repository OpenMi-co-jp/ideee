require 'rails_helper'

RSpec.describe User, type: :model do
  it 'モデルの作成が有効であること' do
    expect(FactoryBot.build(:user)).to be_valid
  end

  describe 'validations' do
    it 'nameが31文字以上あればユーザー登録に失敗すること' do
      user = FactoryBot.build(:user, name: 'a' * 31)
      user.valid?
      expect(user.errors[:name]).to include("は30文字以内で入力してください")
    end

    it 'emailがなかったら、ユーザー登録に失敗すること' do
      user = FactoryBot.build(:user, email: nil)
      user.valid?
      expect(user.errors[:email]).to include("を入力してください")
    end

    it 'emailが重複する時ユーザー登録に失敗すること' do
      user1 = FactoryBot.create(:user)
      user2 = FactoryBot.build(:user)
      user2.email = user1.email
      user2.valid?
      expect(user2.errors[:email]).to include("はすでに存在します")
    end
  end
end
