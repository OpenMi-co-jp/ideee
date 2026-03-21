require 'rails_helper'

RSpec.describe Resolvers::User::UserIdsResolver do
  describe 'GetUserIds' do
    let(:query) do
      <<~GRAPHQL
        query GetUserIds {
            userIds {
              ids
            }
        }
      GRAPHQL
    end

    let!(:users) { create_list(:user, 3) }

    it 'ユーザーIDの一覧を取得する' do
      post graphql_path, params: { query: }, as: :json
      res_json = response.parsed_body
      result = res_json['data']['userIds']['ids']

      expect(result).to match_array(users.map(&:id))
    end
  end
end
