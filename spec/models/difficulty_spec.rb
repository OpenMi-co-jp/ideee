require 'rails_helper'

RSpec.describe Difficulty, type: :model do
  let(:difficulty_easy) { FactoryBot.create(:difficulty, :easy) }
  let(:difficulty_middle) { FactoryBot.create(:difficulty, :middle) }
  let(:difficulty_hard) { FactoryBot.create(:difficulty, :hard) }

  describe 'Difficultyが有効になること' do
    context 'difficultyのレベルがEasyの時' do
      it '有効であること' do
        expect(difficulty_easy).to be_valid
      end

      it 'easyが返ってくること' do
        expect(difficulty_easy.level).to eq 'easy'
      end
    end

    context 'difficultyのレベルがMiddleの時' do
      it '有効であること' do
        expect(difficulty_middle).to be_valid
      end

      it 'middleが返ってくること' do
        expect(difficulty_middle.level).to eq 'middle'
      end
    end

    context 'difficultyのレベルがHardの時' do
      it '有効であること' do
        expect(difficulty_hard).to be_valid
      end

      it 'hardが返ってくること' do
        expect(difficulty_hard.level).to eq 'hard'
      end
    end
  end

  describe 'Difficulty無効になること' do
    context 'difficultyのレベルがEasyでユーザーIDがないとき' do
      it '無効であること' do
        difficulty_easy.user_id = nil
        expect(difficulty_easy).to be_invalid
      end
    end

    context 'difficultyのレベルがEasyでアイデアIDがないとき' do
      it '無効であること' do
        difficulty_easy.idea_id = nil
        expect(difficulty_easy).to be_invalid
      end
    end

    context 'difficultyのレベルがMiddleでユーザーIDがないとき' do
      it '無効であること' do
        difficulty_middle.user_id = nil
        expect(difficulty_middle).to be_invalid
      end
    end

    context 'difficultyのレベルがMiddleでアイデアIDがないとき' do
      it '無効であること' do
        difficulty_middle.idea_id = nil
        expect(difficulty_middle).to be_invalid
      end
    end

    context 'difficultyのレベルがHardでユーザーIDがないとき' do
      it '無効であること' do
        difficulty_hard.user_id = nil
        expect(difficulty_hard).to be_invalid
      end
    end

    context 'difficultyのレベルがHardでアイデアIDがないとき' do
      it '無効であること' do
        difficulty_hard.idea_id = nil
        expect(difficulty_hard).to be_invalid
      end
    end
  end
end
