require 'rails_helper'

RSpec.describe Mutations::Team::Create do
  subject(:graphql_post) { post graphql_path, params: { query:, variables: variables.to_json }, headers: tokens }

  let(:owner)  { create(:user) }
  let(:idea)   { FactoryBot.create(:idea) }
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

  describe 'チームの作成' do
    let(:variables) do
      {
        input: {
          ownerId: owner.id,
          ideaId: idea.id,
          status: 0,
          requirement: 'hoge',
          offer: 'fuga',
          membersNum: 3
        }
      }
    end

    context '正しいideaIdとownerIdを指定しているとき' do
      it '作成に成功すること' do
        graphql_post
        res = response.parsed_body
        expect(res['data']['createTeam']['success']).to be_truthy
        expect(res['data']['createTeam']['team']['status']).to eq(Team.statuses.key(variables[:input][:status]))
        expect(res['data']['createTeam']['team']['offer']).to eq(variables[:input][:offer])
        expect(res['data']['createTeam']['team']['member_num']).to eq(variables[:input][:member_num])
      end
    end

    context '作成されていないideaが指定されたとき' do
      before do
        variables[:input][:ideaId] = 0
      end

      it 'raise errror ActiveRecord::RecordInvalidとなること' do
        request_result = expect do
          graphql_post
        end

        request_result.to raise_error(ActiveRecord::RecordInvalid, 'バリデーションに失敗しました: Ideaを入力してください')
      end
    end

    context '存在しないownerIdが指定されたとき' do
      before do
        variables[:input][:ownerId] = 0
      end

      it 'raise errror ActiveRecord::RecordInvalidとなること' do
        request_result = expect do
          graphql_post
        end

        request_result.to raise_error(ActiveRecord::RecordInvalid, 'バリデーションに失敗しました: Ownerを入力してください')
      end
    end

    context 'ideaIdを指定していないとき' do
      before do
        variables[:input][:ideaId] = nil
      end

      it '作成に失敗しレスポンスにエラー内容が含まれること' do
        graphql_post
        res = response.parsed_body
        expect(res['errors'][0]['message']).to include('Variable $input of type CreateTeamInput! was provided invalid value for ideaId')
      end
    end

    context 'ownerIdを指定していないとき' do
      before do
        variables[:input][:ownerId] = nil
      end

      it '作成に失敗しレスポンスにエラー内容が含まれること' do
        graphql_post
        res = response.parsed_body
        expect(res['errors'][0]['message']).to include('Variable $input of type CreateTeamInput! was provided invalid value for ownerId')
      end
    end
  end
end
