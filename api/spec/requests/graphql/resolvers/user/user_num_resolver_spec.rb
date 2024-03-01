require 'rails_helper'

RSpec.describe Resolvers::User::UserNumResolver do
  describe 'GetUserNum' do
    let(:query) do
      <<~GRAPHQL
        query GetUserNum {
            userNum
        }
      GRAPHQL
    end

    before do
      create_list(:user, 5)
      post graphql_path, params: { query: }
    end

    it '現在のユーザー数を取得する' do
      res_json = response.parsed_body
      puts res_json
      result = res_json['data']['userNum']

      expect(result).to eq(5)
    end
  end
end
