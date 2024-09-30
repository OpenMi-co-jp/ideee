require 'rails_helper'

RSpec.describe Mutations::TeamUser::Destroy do
  subject(:graphql_post) { post graphql_path, params: { query:, variables: variables.to_json }, headers: tokens }

  let(:user)   { create(:user) }
  let(:team)   { create(:team) }
  let(:tokens) { sign_in(user) }

  let(:query) do
    <<-GQL
      mutation leaveTeam($input: LeaveTeamInput!) {
        leaveTeam(input: $input) {
          success
          errors
        }
      }
    GQL
  end

  describe 'チームの離脱' do
    let(:variables) do
      {
        input: {
          teamId: team.id.to_s
        }
      }
    end

    context '適切なinputで削除するとき' do
      before do
        create(:team_user, team:, user:)
      end

      it '削除に成功すること' do
        graphql_post
        res = response.parsed_body
        reloaded_team_user = TeamUser.find_by(team_id: team.id)
        expect(res['data']['leaveTeam']['success']).to be_truthy
        expect(reloaded_team_user).to be_nil
      end
    end

    context '更新対象のチームidが存在していないとき' do
      before do
        variables[:input][:teamId] = nil
      end

      it '作成に失敗しレスポンスにエラー内容が含まれること' do
        graphql_post
        res = response.parsed_body
        expect(res['errors'][0]['message']).to include('Variable $input of type LeaveTeamInput! was provided invalid value for teamId (Expected value to not be null)')
      end
    end
  end
end
