require 'rails_helper'

RSpec.describe Mutations::Like::Destroy do
  subject(:graphql_post) { post graphql_path, params: { query:, variables: variables.to_json }, headers: tokens }

  let!(:like)   { create(:like, :idea) }
  let!(:user)   { like.user }
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

  describe 'いいねを削除' do
    let(:variables) do
      {
        input: {
          id: like.id
        }
      }
    end

    it 'リクエストが成功すること' do
      graphql_post
      res = response.parsed_body
      expect(res['data']['destroyLike']['success']).to be_truthy
    end

    it 'いいねが削除されていること' do
      expect { graphql_post }.to change(Like, :count).by(-1)
    end
  end

  describe 'エラーハンドリング' do
    context '存在しないlike.idを削除しようとした場合' do
      let(:variables) do
        {
          input: {
            id: 0
          }
        }
      end

      it 'リクエストが失敗すること' do
        expect { graphql_post }.to raise_error(NoMethodError)
      end
    end
  end
end
