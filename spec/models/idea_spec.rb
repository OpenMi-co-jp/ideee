require 'rails_helper'

RSpec.describe Idea, type: :model do
  let(:idea) { build(:idea) }

  it 'モデルの作成が有効である' do
    expect(idea).to be_valid
  end

  describe 'validations' do
    it 'nameがなかったら、アイデア登録に失敗する' do
      idea = build(:idea, name: nil)
      idea.valid?
      expect(idea.errors[:name]).to include('を入力してください')
    end

    it 'nameが51文字以上あればアイデア登録に失敗する' do
      idea = build(:idea, name: 'a' * 51)
      idea.valid?
      expect(idea.errors[:name]).to include('は50文字以内で入力してください')
    end

    it 'backgroundがなかったら、アイデア登録に失敗する' do
      idea = build(:idea, background: nil)
      idea.valid?
      expect(idea.errors[:background]).to include('を入力してください')
    end

    it 'backgroundが255文字以上あればアイデア登録に失敗する' do
      idea = build(:idea, background: 'a' * 256)
      idea.valid?
      expect(idea.errors[:background]).to include('は255文字以内で入力してください')
    end

    it 'goalがなかったら、アイデア登録に失敗する' do
      idea = build(:idea, goal: nil)
      idea.valid?
      expect(idea.errors[:goal]).to include('を入力してください')
    end

    it 'goalが255文字以上あればアイデア登録に失敗する' do
      idea = build(:idea, goal: 'a' * 256)
      idea.valid?
      expect(idea.errors[:goal]).to include('は255文字以内で入力してください')
    end

    it 'product_urlがURLのフォーマットでなければアイデア登録に失敗する' do
      idea = build(:idea, product_url: 'test')
      idea.valid?
      expect(idea.errors[:product_url]).to include('は不正な値です')
    end

    it 'github_urlがURLのフォーマットでなければアイデア登録に失敗する' do
      idea = build(:idea, github_url: 'test')
      idea.valid?
      expect(idea.errors[:github_url]).to include('は不正な値です')
    end

    it 'idea_tagsが3つ以上の登録があればアイデア登録に失敗する' do
      tag_list = ['tag1', 'tag2', 'tag3', 'tag4']
      idea.save_with_tags(tag_list)
      expect(idea.errors[:base]).to include('タグは3つまでしか入力できません')
    end
  end
end
