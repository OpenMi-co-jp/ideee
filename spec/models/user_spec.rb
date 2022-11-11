require 'rails_helper'

RSpec.describe User, type: :model do
  it 'モデルの作成が有効であること' do
    expect(build(:user)).to be_valid
  end

  describe 'validations' do
    it 'nameが31文字以上あればユーザー登録に失敗すること' do
      user = build(:user, name: 'a' * 31)
      user.valid?
      expect(user.errors[:name]).to include('は30文字以内で入力してください')
    end

    it 'emailがなかったら、ユーザー登録に失敗すること' do
      user = build(:user, email: nil)
      user.valid?
      expect(user.errors[:email]).to include('を入力してください')
    end

    it 'emailが重複する時ユーザー登録に失敗すること' do
      user1 = create(:user)
      user2 = build(:user)
      user2.email = user1.email
      byebug
      user2.valid?
      expect(user2.errors[:email]).to include('はすでに存在します')
    end

    it 'descriptionが200文字以上の場合、ユーザー登録に失敗すること' do
      user = build(:user, description: 'a' * 201)
      user.valid?
      expect(user.errors[:description]).to include('は200文字以内で入力してください')
    end

    describe 'site_url' do
      it 'URL形式ではない場合、ユーザー登録に失敗すること' do
        user = build(:user, site_url: 'hogehoge.com')
        user.valid?
        expect(user.errors[:site_url]).to include('は不正な値です')
      end

      it '空白の場合、正常にユーザー登録ができること' do
        user = build(:user, site_url: '')
        expect(user).to be_valid
      end
    end
  end
end
