require 'rails_helper'

RSpec.describe Mutations::Like::Create do
  subject(:graphql_post) { post graphql_path, params: { query:, variables: variables.to_json }, headers: tokens, as: :json }

  let(:user)   { create(:user) }
  let(:idea)   { create(:idea) }
  let(:tokens) { sign_in(user) }

  let(:query) do
    <<-GQL
      mutation CreateLike($input: CreateLikeInput!) {
        createLike(input: $input) {
          like {
            likableType
            likableId
          }
          success
        }
      }
    GQL
  end

  let(:variables) do
    {
      input: {
        likableType: likable_type,
        likableId: likable_id
      }
    }
  end

  describe 'いいねを送る' do
    context '正しいlikableIdを指定している時' do
      let(:likable_id) { idea.id }
      let(:likable_type) { 'Idea' }

      it 'リクエストが成功すること' do
        graphql_post
        res = response.parsed_body

        # Debug output
        warn "DEBUG secret_key_base: #{Rails.application.secret_key_base[0..20]}..."
        warn "DEBUG response.status: #{response.status}"
        warn "DEBUG response.body: #{response.body[0..500]}"

        expect(res['data']['createLike']['success']).to be_truthy
        expect(res['data']['createLike']['like']['likableType']).to eq(likable_type)
        expect(res['data']['createLike']['like']['likableId']).to eq(likable_id)
      end

      it 'いいねが送られること' do
        expect { graphql_post }.to change(Like, :count).by(1)
      end
    end

    context '正しいlikableIdを指定していない時' do
      let(:likable_id) { nil }
      let(:likable_type) { 'Idea' }

      it 'リクエストが失敗すること' do
        graphql_post
        res = response.parsed_body

        expect(res['errors'][0]['message']).to include('Variable $input of type CreateLikeInput!')
      end

      it 'いいねが送られないこと' do
        expect { graphql_post }.not_to change(Like, :count)
      end
    end
  end
end
