require 'rails_helper'

RSpec.describe Mutations::Comment::Create do

  describe 'comment作成' do
    subject { post('/graphql', params: { query: @query, variables: @variables.to_json }, headers: @auth_tokens) }

    let!(:user) { FactoryBot.create(:user) }
    let!(:idea) { FactoryBot.create(:idea, user: user)}

    before do
      @auth_tokens = { "Authorization": 'Bearer xxx' }
    end

    before do
      @query = <<~GRAPHQL
      mutation CreateComment($input: CreateCommentInput!) {
        createComment(input: $input) {
          comment {
            id
            description
          }
          success
        }
      }
      GRAPHQL
    end

    context "test" do
      before do
        @variables = {
          input: {
            id

          }
        }
      end
    end
  end
end
