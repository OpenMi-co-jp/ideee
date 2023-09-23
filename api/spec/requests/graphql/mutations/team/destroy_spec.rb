require 'rails_helper'

RSpec.describe Mutations::Team::Destroy do
  let(:owner)  { create(:user) }
  let(:idea)   { FactoryBot.create(:idea) }
  let(:tokens) { sign_in(owner) }

  let(:query) do
    <<-GQL
    mutation DestroyTeam($input: DestroyTeamInput!) {
      destroyTeam(input: $input) {
        success
      }
    }
    GQL
  end

  let(:team) { FactoryBot.create(:team, idea_id: idea.id, owner_id: owner.id) }

  describe 'チームの削除' do
    before do
      post graphql_path, params: { query:, variables: variables.to_json }, headers: tokens
    end

    let!(:variables) do
      {
        input: {
          id: team.id
        }
      }
    end

    context '適切なinputで削除するとき' do
      it '削除に成功すること' do
        res = response.parsed_body
        reloaded_team = Team.find_by(id: team.id)
        expect(res['data']['destroyTeam']['success']).to be_truthy
        expect(reloaded_team).to be_nil
      end
    end

    context '更新対象のidが存在していないとき' do
      before do
        variables[:input][:id] = nil
      end

      it '作成に失敗しレスポンスにエラー内容が含まれること' do
        post graphql_path, params: { query:, variables: variables.to_json }, headers: tokens
        res =  response.parsed_body
        expect(res['errors'][0]['message']).to include('Variable $input of type DestroyTeamInput! was provided invalid value for id (Expected value to not be null)')
      end
    end
  end
end
