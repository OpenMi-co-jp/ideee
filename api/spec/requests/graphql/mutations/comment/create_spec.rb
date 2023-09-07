# spec/requests/graphql/mutations/comment_create_spec.rb

require 'rails_helper'

RSpec.describe Mutations::Comment::Create do
  subject(:graphql_post) { post graphql_path, params: { query:, variables: variables.to_json }, headers: tokens }

  let(:user)   { create(:user) }
  let(:tokens) { sign_in(user) }

  let(:query) do
    <<-GQL
      mutation CreateComment($input: CreateCommentInput!) {
        createComment(input: $input) {
          comment {
            id
            description
          }
          success
          errors
        }
      }
    GQL
  end

  let(:variables) do
    {
      input: {
        userId: user.id,
        ideaId: idea_id,
        description:
      }
    }
  end

  describe 'コメントの作成' do
    context '正しいideaIdを指定している時' do
      let(:description) { 'Sample comment' }
      let(:idea_id) { create(:idea).id }

      it '作成に成功する' do
        graphql_post
        res = response.parsed_body

        expect(res['data']['createComment']['success']).to be_truthy
        expect(res['data']['createComment']['comment']['description']).to eq(description)
      end
    end

    context 'Ideaが作られてない時' do
      let(:description) { 'Sample comment' }
      let(:idea_id) { 0 }

      it '作成に失敗する' do
        graphql_post
        res = response.parsed_body

        expect(res['data']['createComment']['success']).to be_falsy
        expect(res['data']['createComment']['errors']).to include('Ideaを入力してください')
      end
    end

    context 'ideaIdを指定していない時' do
      let(:description) { 'Sample comment' }
      let(:idea_id) { nil }

      it '作成に失敗する' do
        graphql_post
        res = response.parsed_body

        expect(res['errors'][0]['message']).to include('Variable $input of type CreateCommentInput!')
      end
    end
  end
end
