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
      post graphql_path, params: { query: }
    end

    it '現在のユーザー数を取得する' do
      res_json = response.parsed_body
      result = res_json['data']['userCount']

      expect(result).to eq(User.count)
    end
  end
end
