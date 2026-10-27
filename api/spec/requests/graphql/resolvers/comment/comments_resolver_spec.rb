# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Resolvers::Comment::CommentsResolver do
  subject(:graphql_post) { post graphql_path, params: { query:, variables: variables.to_json }, headers:, as: :json }

  let(:author)   { create(:user) }
  let(:idea)     { create(:idea, user: author, draft: true) }
  let!(:comment) { create(:comment, idea:) }

  let(:query) do
    <<-GRAPHQL
      query($ideaId: ID!) {
        comments(ideaId: $ideaId) {
          id
          description
        }
      }
    GRAPHQL
  end
  let(:variables) { { ideaId: idea.id } }

  describe 'GetComments' do
    context '下書きアイデアを第三者が参照した場合' do
      let(:headers) { sign_in(create(:user)) }

      it 'コメントが返らない' do
        graphql_post

        expect(response.parsed_body['data']['comments']).to eq([])
      end
    end

    context '下書きアイデアを未ログインで参照した場合' do
      let(:headers) { {} }

      it 'コメントが返らない' do
        graphql_post

        expect(response.parsed_body['data']['comments']).to eq([])
      end
    end

    context '下書きアイデアの作成者が参照した場合' do
      let(:headers) { sign_in(author) }

      it 'コメントを取得できる' do
        graphql_post

        expect(response.parsed_body['data']['comments'].pluck('id')).to eq([comment.id.to_s])
      end
    end

    context '公開アイデアの場合' do
      let(:idea) { create(:idea, user: author, draft: false) }
      let(:headers) { {} }

      it '誰でもコメントを取得できる' do
        graphql_post

        expect(response.parsed_body['data']['comments'].pluck('id')).to eq([comment.id.to_s])
      end
    end
  end
end
