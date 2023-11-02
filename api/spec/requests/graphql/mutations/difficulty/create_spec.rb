require 'rails_helper'

RSpec.describe Mutations::Difficulty::Create do
  subject(:graphql_post) { post graphql_path, params: { query:, variables: variables.to_json }, headers: tokens }

  let(:user)   { create(:user) }
  let(:tokens) { sign_in(user) }

  let(:query) do
    <<-GQL
      mutation CreateDifficulty($input: CreateDifficultyInput!) {
        createDifficulty(input: $input) {
          difficulty {
            id
            userId
            ideaId
            level
            createdAt
          }
          success
        }
      }
    GQL
  end

  let(:variables) do
    {
      input: {
        userId: user.id,
        ideaId: idea_id,
        level:
      }
    }
  end

  describe '難易度の作成' do
    context '正しいideaIdを指定している時' do
      let(:idea_id) { create(:idea).id }
      let(:level) { 'easy' }

      it '作成に成功する' do
        graphql_post
        res = response.parsed_body

        expect(res['data']['createDifficulty']['success']).to be_truthy
        expect(res['data']['createDifficulty']['difficulty']['level']).to eq(level)
      end
    end

    context '正しいideaIdを指定していない時' do
      let(:idea_id) { nil }
      let(:level) { 'easy' }

      it '作成に失敗する' do
        graphql_post
        res = response.parsed_body

        expect(res['errors'][0]['message']).to include('Variable $input of type CreateDifficultyInput!')
      end
    end

    context '正しいlevelを指定していない時' do
      let(:idea_id) { create(:idea).id }
      let(:level) { 0 }

      it '作成に失敗する' do
        graphql_post
        res = response.parsed_body

        expect(res['errors'][0]['message']).to include('Variable $input of type CreateDifficultyInput!')
      end
    end
  end
end
