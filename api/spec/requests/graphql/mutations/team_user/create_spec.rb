require 'rails_helper'

RSpec.describe Mutations::TeamUser::Create do
  subject(:graphql_post) { post graphql_path, params: { query:, variables: variables.to_json }, headers: tokens, as: :json }

  let(:user)   { create(:user) }
  let(:team)   { create(:team) }
  let(:tokens) { sign_in(user) }

  let(:query) do
    <<-GQL
      mutation joinTeam($input: JoinTeamInput!) {
        joinTeam(input: $input) {
          teamUser {
            teamId
            userId
          }
          success
        }
      }
    GQL
  end

  describe 'チームの参加' do
    let(:variables) do
      {
        input: {
          teamId: team.id.to_s
        }
      }
    end

    context 'チームへ参加する時' do
      it '作成に成功すること' do
        graphql_post
        res = response.parsed_body
        expect(res['data']['joinTeam']['success']).to be_truthy
        expect(res['data']['joinTeam']['teamUser']['teamId']).to eq(team.id)
        expect(res['data']['joinTeam']['teamUser']['userId']).to eq(user.id)
      end
    end

    context '作成されていないteam指定されたとき' do
      before do
        variables[:input][:teamId] = 0
      end

      it '作成に失敗すること' do
        graphql_post
        res = response.parsed_body
        expect(res['data']['joinTeam']['success']).to be false
        expect(res['data']['joinTeam']['teamUser']).to be_nil
      end
    end

    context 'すでにチームに参加している場合' do
      before do
        create(:team_user, team:, user:)
      end

      it '作成に失敗すること' do
        graphql_post
        res = response.parsed_body
        expect(res['data']['joinTeam']['success']).to be false
        expect(res['data']['joinTeam']['teamUser']).to be_nil
      end
    end

    context 'teamIdを指定していないとき' do
      before do
        variables[:input][:teamId] = nil
      end

      it '作成に失敗しレスポンスにエラー内容が含まれること' do
        graphql_post
        res = response.parsed_body
        expect(res['errors'][0]['message']).to include('Variable $input of type JoinTeamInput! was provided invalid value for teamId (Expected value to not be null)')
      end
    end
  end
end
