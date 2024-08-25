require 'rails_helper'

RSpec.describe Mutations::Team::Update do
  subject(:graphql_post) { post graphql_path, params: { query:, variables: variables.to_json }, headers: tokens }

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

  let(:team) { FactoryBot.create(:team, idea:, owner_id: owner.id) }

  describe 'チームの作成' do
    let(:variables) do
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

    context '適切なinputで更新するとき' do
      it '更新に成功すること' do
        graphql_post
        res = response.parsed_body
        expect(res['data']['updateTeam']['success']).to be_truthy
      end

      it '正しい更新内容が反映されていること' do
        graphql_post
        res = response.parsed_body

        # GraphQLはID型を通常文字列型として返却するためstringにcastしています。
        expect(res['data']['updateTeam']['team']['id']).to eq(team.id.to_s)
        expect(res['data']['updateTeam']['team']['status']).to eq(Team.statuses.key(variables[:input][:status]))
        expect(res['data']['updateTeam']['team']['offer']).to eq(variables[:input][:offer])
        expect(res['data']['updateTeam']['team']['members_num']).to eq(variables[:input][:members_num])
      end
    end

    context '更新対象のidが存在していないとき' do
      before do
        variables[:input][:id] = nil
      end

      it '作成に失敗しレスポンスにエラー内容が含まれること' do
        graphql_post
        res = response.parsed_body
        expect(res['errors'][0]['message']).to include('Variable $input of type UpdateTeamInput! was provided invalid value for id (Expected value to not be null)')
      end
    end
  end
end
