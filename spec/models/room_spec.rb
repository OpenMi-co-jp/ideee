require 'rails_helper'

RSpec.describe Room do
  let(:room) { FactoryBot.create(:room) }

  describe 'Roomが有効になること' do
    it '有効であること' do
      expect(room).to be_valid
    end

    it 'idのlengthが36であること' do
      expect(room.id.length).to eq 36
    end
  end

  describe 'Roomが無効になること' do
    context 'when the team_id is nil' do
      it '無効であること' do
        room.team_id = nil
        expect(room).to be_invalid
      end
    end
  end
end
