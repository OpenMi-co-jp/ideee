# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Message do
  let(:message) { FactoryBot.build(:message) }

  it '有効なメッセージが作成できること' do
    expect(message).to be_valid
  end

  describe 'アソシエーション' do
    it 'roomとの関連付けがある' do
      association = described_class.reflect_on_association(:room)
      expect(association.macro).to eq :belongs_to
    end

    it 'userとの関連付けがある' do
      association = described_class.reflect_on_association(:user)
      expect(association.macro).to eq :belongs_to
    end
  end
end
