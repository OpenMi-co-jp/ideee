require 'rails_helper'

RSpec.describe Notification, type: :model do
  it 'モデルの作成が有効であること' do
    expect(FactoryBot.build(:notification)).to be_valid
  end

  describe 'scope' do
    describe 'not_sent_likes' do
      subject { described_class.not_sent_likes }

      context 'notificatable_typeがLikeIdeaかつsend_atが設定されていない場合' do
        let!(:notification) { FactoryBot.create(:notification) }

        it { is_expected.to include notification }
      end

      context 'notificatable_typeがLikeIdea以外の場合' do
        let!(:notification) { FactoryBot.create(:notification, notificatable_type: 'Comment') }

        it { is_expected.not_to include notification }
      end

      context 'send_atが設定されている場合' do
        let!(:notification) { FactoryBot.create(:notification, send_at: DateTime.now) }

        it { is_expected.not_to include notification }
      end
    end
  end
end
