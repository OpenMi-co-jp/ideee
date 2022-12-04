require 'rails_helper'

RSpec.describe Team, type: :model do
  let!(:team) { FactoryBot.create(:team) }
  let(:user) { FactoryBot.create(:user) }

  describe 'teamが有効になること' do
    it '有効であること' do
      expect(team).to be_valid
    end

    it 'test_offerが返ってくること' do
      expect(Team.last.offer).to eq team.offer
    end

    it 'test_requirementが返ってくること' do
      expect(team.requirement).to eq 'test_requirement'
    end

    it 'activeが返ってくること' do
      expect(team.status).to eq 'active'
    end

    it 'stopが返ってくること' do
      team.status = 1
      expect(team.status).to eq 'stop'
    end

    it 'finishedが返ってくること' do
      team.status = 2
      expect(team.status).to eq 'finished'
    end
  end

  describe 'joined?(user)メソッドの有効性' do
    context 'メンバーになっている時' do
      it 'trueが返ってくること' do
        TeamUser.create(user_id: user.id, team_id: team.id)
        expect(team.joined?(user)).to eq true
      end
    end

    context 'メンバーになっていない時' do
      it 'falseが返ってくること' do
        expect(team.joined?(user)).to eq false
      end
    end
  end

  describe 'teamが無効になること' do
    context 'offerが存在しない時' do
      it '無効であること' do
        team.offer = nil
        expect(team).to be_invalid
      end

      it 'エラー文言が返ってくること' do
        team.offer = nil
        team.valid?
        expect(team.errors[:offer]).to include('を入力してください')
      end
    end

    context 'requirementが存在しない時' do
      it '無効であること' do
        team.requirement = nil
        expect(team).to be_invalid
      end

      it 'エラー文言が返ってくること' do
        team.requirement = nil
        team.valid?
        expect(team.errors[:requirement]).to include('を入力してください')
      end
    end

    context 'statusが存在しない時' do
      it '無効であること' do
        team.status = nil
        expect(team).to be_invalid
      end

      it 'エラー文言が返ってくること' do
        team.status = nil
        team.valid?
        expect(team.errors[:status]).to include('を入力してください')
      end
    end

    context 'owner_idが存在しない時' do
      it '無効であること' do
        team.owner_id = nil
        expect(team).to be_invalid
      end

      it 'エラー文言が返ってくること' do
        team.owner_id = nil
        team.valid?
        expect(team.errors[:owner_id]).to include('を入力してください')
      end
    end
  end
end
