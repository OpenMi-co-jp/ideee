require 'rails_helper'

RSpec.describe Mutations::Like::Destroy do
  subject(:graphql_post) { post graphql_path, params: { query:, variables: variables.to_json }, headers: tokens }

  let!(:like) { create(:like, :idea) }
  let!(:user) { like.user }
  let!(:tokens) { sign_in(user) }

  let(:query) do
    <<-GQL
      mutation DestroyLike($input: DestroyLikeInput!) {
        destroyLike(input: $input) {
          success
        }
      }
    GQL
  end

  let(:variables) do
    {
      input: {
        id: like.id
      }
    }
  end

  describe 'ハートを削除' do
    it 'リクエストが成功すること' do
      graphql_post
      res = response.parsed_body
      expect(res['data']['destroyLike']['success']).to be_truthy
    end

    it 'ハートが削除されていること' do
      expect do
        graphql_post
      end.to change(Like, :count).by(-1)
    end
  end
end
