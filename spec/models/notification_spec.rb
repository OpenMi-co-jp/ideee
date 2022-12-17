require 'rails_helper'

RSpec.describe Notification, type: :model do
  it 'モデルの作成が有効であること' do
    expect(FactoryBot.build(:notification)).to be_valid
  end

  describe 'scope' do
    describe 'not_sent_likes' do
      subject { described_class.not_sent_likes }

      let!(:notification) { FactoryBot.create(:notification) }

      it { is_expected.to include notification }
    end
  end
end
