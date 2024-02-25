require 'rails_helper'

RSpec.describe Mutations::Idea::Create do
  subject(:graphql_post) { post graphql_path, params: { query:, variables: variables.to_json }, headers: tokens }

  let(:current_user) { create(:user) }
  let(:tokens)       { sign_in(current_user) }
  let(:idea)         { create(:idea, user: current_user) }

  let(:base_variables) do
    {
      input: {
        name: 'create idea',
        background: 'create background',
        goal: 'create goal',
        stance: 'free_right',
        tagList: %w[tag1 tag2]
      }
    }
  end

  let(:query) do
    <<-GQL
      mutation CreateIdea($input: CreateIdeaInput!) {
        createIdea(input: $input) {
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

  let(:response_data) { response.parsed_body['data']['createIdea'] }

  describe 'アイデアの作成' do
    context 'ideaのユーザーの場合' do
      let(:variables) { base_variables }

      it '作成に成功すること' do
        expect(response_data['success']).to be_truthy
      end

      it 'tag_listが含まれること' do
        expect(response_data['idea']).to include('ideaTags')
      end

      it '正しい作成内容が反映されていること' do
        expect(response_data['idea']['userId']).to eq(current_user.id)
        expect(response_data['idea']['ideaTags'].pluck('name')).to match_array(%w[tag1 tag2])
      end
    end

    context 'ideaのnameがnullの場合' do
      let(:variables) { base_variables.deep_merge(input: { name: '' }) }

      it '作成に失敗しレスポンスにエラー内容が含まれること' do
        expect(response_data['success']).to be_falsey
        expect(response_data['errors']).to include('アイデア名を入力してください')
      end
    end
  end
end
