require 'rails_helper'

RSpec.describe Mutations::Comment::Update do
  subject(:graphql_post) { post graphql_path, params: { query:, variables: variables.to_json }, headers: tokens, as: :json }

  let(:current_user)     { create(:user) }
  let(:tokens)           { sign_in(current_user) }
  let(:comment)          { create(:comment, user: current_user) }
  let(:existing_comment) { create(:comment, user: create(:user)) }

  let(:base_variables) do
    {
      input: {
        id: comment.id,
        description: 'updated description'
      }
    }
  end

  let(:query) do
    <<-GQL
      mutation UpdateComment($input: UpdateCommentInput!) {
        updateComment(input: $input) {
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

  before { graphql_post }

  let(:response_data) { response.parsed_body['data']['updateComment'] }

  describe 'コメントの更新' do
    context 'コメントのユーザーの場合' do
      let(:variables) { base_variables }

      it '更新に成功すること' do
        expect(response_data['success']).to be_truthy
      end

      it '正しい更新内容が反映されていること' do
        expect(response_data['comment']['id']).to eq(comment.id.to_s)
        expect(response_data['comment']['description']).to eq('updated description')
      end
    end

    context 'コメントのidがnullの場合' do
      let(:variables) { base_variables.deep_merge(input: { id: '' }) }

      it '更新に失敗しレスポンスにエラー内容が含まれること' do
        expect(response.parsed_body['errors'][0]['message']).to eq 'コメントが見つかりません'
      end
    end

    context 'コメントのuser_idとログインのユーザーが異なる場合' do
      let(:variables) { base_variables.deep_merge(input: { id: existing_comment.id }) }

      it '更新に失敗しレスポンスにエラー内容が含まれること' do
        expect(response.parsed_body['errors'][0]['message']).to eq '権限がありません'
      end
    end

    context 'コメントのdescriptionがnullの場合' do
      let(:variables) { base_variables.deep_merge(input: { description: '' }) }

      it '更新に失敗しレスポンスにエラー内容が含まれること' do
        expect(response_data['success']).to be_falsey
        expect(response_data['errors']).to include('コメントを入力してください')
      end
    end
  end
end
