require 'rails_helper'

RSpec.describe Resolvers::User::UserCountResolver do
  describe 'GetUserCount' do
    let(:query) do
      <<~GRAPHQL
        query GetUserCount {
            userCount
        }
      GRAPHQL
    end

    before do
      create_list(:user, 5)
    end

    it '現在のユーザー数を取得する' do
      post graphql_path, params: { query: }
      res_json = response.parsed_body
      result = res_json['data']['userCount']

      expect(result).to eq(5)
    end
  end
end
