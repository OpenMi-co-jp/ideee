require 'rails_helper'

RSpec.describe Mutations::Idea::Update do
  subject(:graphql_post) { post graphql_path, params: { query:, variables: variables.to_json }, headers: tokens }

  let(:current_user) { create(:user) }
  let(:tokens) { sign_in(current_user) }
  let(:idea) { FactoryBot.create(:idea, user: current_user) }

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
    context 'ユーザーがideaのユーザーの場合更新できる' do
      let(:variables) do
        {
          input: {
            id: idea.id,
            userId: current_user.id,
            name: 'updated idea',
            background: 'updated background',
            goal: 'updated goal',
            tagList: ['tag1', 'tag2'],
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

        updated_idea = res['data']['updateIdea']['idea']
        updated_user = res['data']['updateIdea']['user'] 
        updated_idea_tags = res['data']['updateIdea']['ideaTags']
        expect(updated_idea['id']).to eq(idea.id.to_s)
        expect(updated_user['id']).to eq(current_user.id.to_s) 
        expect(updated_idea['name']).to eq('updated idea')
        expect(updated_idea['background']).to eq('updated background')
        expect(updated_idea['goal']).to eq('updated goal')
        expect(updated_idea_tags.map { |tag| tag['name'] }).to match_array(['tag1', 'tag2'])  
      end
    end
  end
end
