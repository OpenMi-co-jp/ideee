require 'rails_helper'

RSpec.describe Mutations::Idea::Update do
  subject(:graphql_post) { post graphql_path, params: { query:, variables: variables.to_json }, headers: tokens }

  let(:current_user) { create(:user) }
  let(:tokens)       { sign_in(current_user) }
  let(:idea)         { FactoryBot.create(:idea, user: current_user) }

  let(:query) do
    <<-GQL
    mutation UpdateIdea($input: UpdateIdeaInput!) {
      updateIdea(input: $input) {
        idea {
          id
          name
          background
          goal
        }
        user {
          id
        }
        ideaTags {
          name
        }
        success
        errors
      }
    }
    GQL
  end

  describe 'アイデアの更新' do
    context 'when ユーザーがideaのユーザーの場合更新できる' do
      let(:variables) do
        {
          input: {
            id: idea.id,
            userId: current_user.id,
            name: 'updated idea',
            background: 'updated background',
            goal: 'updated goal',
            tagList: %w[tag1 tag2]
          }
        }
      end

      it '更新に成功すること' do
        graphql_post
        res = response.parsed_body
        expect(res['data']['updateIdea']['success']).to be_truthy
      end

      it '正しい更新内容が反映されていること' do
        graphql_post
        res = response.parsed_body
        updated_user = res['data']['updateIdea']['user']
        updated_idea_tags = res['data']['updateIdea']['ideaTags']
        expect(updated_user['id']).to eq(current_user.id.to_s)
        expect(updated_idea_tags.pluck('name')).to match_array(%w[tag1 tag2])
      end
    end

    context 'when ideaのユーザー以外の場合更新できない' do
      let(:other_user) { create(:user) }
      let(:variables) do
        {
          input: {
            id: idea.id,
            userId: other_user.id,
            name: 'updated idea',
            background: 'updated background',
            goal: 'updated goal',
            tagList: %w[tag1 tag2]
          }
        }
      end

      it '更新に失敗すること' do
        graphql_post
        res = response.parsed_body
        expect(res['data']['updateIdea']['success']).to be_falsey
        expect(res['data']['updateIdea']['errors']).to include('ユーザーの権限がありません')
      end
    end

    context 'when nameがnullの場合アイディアを更新できない' do
      let(:variables) do
        {
          input: {
            id: idea.id,
            userId: current_user.id,
            name: '',
            background: 'updated background',
            goal: 'updated goal',
            tagList: %w[tag1 tag2]
          }
        }
      end

      it '更新に失敗しレスポンスにエラー内容が含まれること' do
        graphql_post
        res = response.parsed_body
        expect(res['data']['updateIdea']['success']).to be_falsey
        expect(res['data']['updateIdea']['errors']).to include('アイデア名を入力してください')
      end
    end
  end
end
