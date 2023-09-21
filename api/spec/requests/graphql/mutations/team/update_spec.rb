require 'rails_helper'

RSpec.describe Mutations::Team::Update do
  let(:owner)  { create(:user) }
  let(:idea)   { FactoryBot.create(:idea) }
  let(:tokens) { sign_in(owner) }

  let(:query) do
    <<-GQL
    mutation updateTeam($input: UpdateTeamInput!) {
      updateTeam(input: $input) {
        team {
          id
          ownerId
          status
          requirement
          offer
          membersNum
        }
        success
      }
    }
    GQL
  end

  let(:team) { FactoryBot.create(:team, idea: idea, owner_id: owner.id)}

  describe 'チームの作成' do
    before do
      post graphql_path, params: { query:, variables: variables.to_json }, headers: tokens
    end

    let!(:variables) do
      {
        input: {
          id: team.id,
          ownerId: owner.id,
          ideaId: idea.id,
          status: 0,
          requirement: 'updated hoge',
          offer: 'updated fuga',
          membersNum: 5
        }
      }
    end

    it "更新に成功すること" do
      res = response.parsed_body

      expect(res['data']['updateTeam']['success']).to be_truthy
      # GraphQLはID型を通常文字列型として返却するためstringにcastしています。
      expect(res['data']['updateTeam']['team']['id']).to eq(team.id.to_s)
      expect(res['data']['updateTeam']['team']['status']).to eq(variables[:input][:status])
      expect(res['data']['updateTeam']['team']['requirement']).to eq(variables[:input][:requirement])
      expect(res['data']['updateTeam']['team']['offer']).to eq(variables[:input][:offer])
      expect(res['data']['updateTeam']['team']['members_num']).to eq(variables[:input][:members_num])
    end

  end
end
