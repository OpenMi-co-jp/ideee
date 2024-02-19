# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Tag do
  let!(:tag) { FactoryBot.create(:tag) }

  describe 'タグを設定' do
    it 'モデルの作成が有効であること' do
      expect(FactoryBot.build(:tag)).to be_valid
    end
  end

  describe 'タグのバリデーション' do
    let(:tag_without_name) { FactoryBot.build(:tag, name: '') }

    it '作成の失敗' do
      expect(tag_without_name).to be_invalid
    end
  end

  describe 'タグのスコープ' do
    describe 'recent_tags' do
      subject(:recent_tags) { described_class.recent_tags }

      let!(:old_tag) { FactoryBot.create(:tag, created_at: 13.months.ago) }

      it '最近のタグに絞る' do
        expect(recent_tags).not_to include(old_tag)
        expect(recent_tags).to include tag
      end
    end

    describe 'popular_tags' do
      subject(:popular_tags) { described_class.popular_tags }

      let(:tag2) { FactoryBot.create(:tag) }
      let(:idea)  { FactoryBot.create(:idea) }
      let(:idea2) { FactoryBot.create(:idea) }

      before do
        tag.taggings.create!(idea:)
        tag2.taggings.create!(idea:)
        tag2.taggings.create!(idea: idea2)
      end

      it 'タグ付けが多い準に並ぶ' do
        expect(popular_tags.first).to eq tag2
        expect(popular_tags.second).to eq tag
      end
    end
  end
end
