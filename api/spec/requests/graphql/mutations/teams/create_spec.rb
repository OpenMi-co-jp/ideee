require 'rails_helper'

RSpec.describe Mutations::Comment::Create do

  let(:owner)  { create(:user) }
  let(:idea) { FactoryBot.create(:idea)}
  let(:tokens) { sign_in(owner) }

  let(:query) do
    <<-GQL
    mutation createTeam($input: CreateTeamInput!) {
      createTeam(input: $input) {
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

  describe "チームの作成" do
    let!(:variables) do
      {
        input: {
          ownerId: owner.id,
          ideaId: idea.id,
          status: 0,
          requirement: "hoge",
          offer: "fuga",
          membersNum: 3
        }
      }
    end
    context '正しいideaIdとownerIdを指定しているとき' do

      it "作成に成功する" do
        post graphql_path, params: { query:, variables: variables.to_json }, headers: tokens
        res = response.parsed_body

        expect(res['data']['createTeam']['success']).to be_truthy
        expect(res['data']['createTeam']['team']['status']).to eq(variables[:input][:status])
        expect(res['data']['createTeam']['team']['requirement']).to eq(variables[:input][:requirement])
        expect(res['data']['createTeam']['team']['offer']).to eq(variables[:input][:offer])
        expect(res['data']['createTeam']['team']['member_num']).to eq(variables[:input][:member_num])

      end
    end
  end
end
