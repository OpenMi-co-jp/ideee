require 'rails_helper'

RSpec.describe Mutations::Idea::Update do
  subject(:graphql_post) { post graphql_path, params: { query:, variables: variables.to_json }, headers: tokens, as: :json }

  let(:current_user) { create(:user) }
  let(:tokens)       { sign_in(current_user) }
  let(:idea)         { create(:idea, user: current_user) }
  let(:other_user)   { create(:user) }

  let(:base_variables) do
    {
      input: {
        id: idea.id,
        userId: current_user.id,
        name: 'updated idea',
        background: 'updated background',
        goal: 'updated goal',
        stance: 'free_right',
        tagList: %w[tag1 tag2],
        publish: true
      }
    }
  end

  let(:query) do
    <<-GQL
      mutation UpdateIdea($input: UpdateIdeaInput!) {
        updateIdea(input: $input) {
          idea {
            id
            name
            background
            goal
            userId
            ideaTags {
              name
            }
          }
          success
          errors
        }
      }
    GQL
  end

  before { graphql_post }

  let(:parsed_response) { response.parsed_body['data']['updateIdea'] }

  describe 'アイデアの更新' do
    context 'ideaのユーザーの場合' do
      let(:variables) { base_variables }

      it '更新に成功すること' do
        expect(parsed_response['success']).to be_truthy
      end

      it 'tag_listが含まれること' do
        expect(parsed_response['idea']).to include('ideaTags')
      end

      it '正しい更新内容が反映されていること' do
        expect(parsed_response['idea']['userId']).to eq(current_user.id)
        expect(parsed_response['idea']['ideaTags'].pluck('name')).to match_array(%w[tag1 tag2])
      end
    end

    context 'ideaの作成者以外のユーザーの場合' do
      let(:variables) { base_variables.deep_merge(input: { userId: other_user.id }) }

      it '更新に失敗すること' do
        expect(parsed_response['success']).to be_falsey
        expect(parsed_response['errors']).to include('ユーザーの権限がありません')
      end
    end

    context 'ideaのnameがnullの場合' do
      let(:variables) { base_variables.deep_merge(input: { name: '' }) }

      it '更新に失敗しレスポンスにエラー内容が含まれること' do
        expect(parsed_response['success']).to be_falsey
        expect(parsed_response['errors']).to include('アイデア名を入力してください')
      end
    end
  end
end
