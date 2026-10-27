# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Resolvers::Concerns::Pagination do
  subject(:graphql_post) { post graphql_path, params: { query:, variables: variables.to_json }, as: :json }

  let(:query) do
    <<-GRAPHQL
      query($page: Int, $per: Int) {
        ideas(page: $page, per: $per) {
          nodes { id }
          pageInfo { per currentPage }
        }
      }
    GRAPHQL
  end

  before { create_list(:idea, 2, draft: false) }

  describe '1ページあたりの件数' do
    context '上限を超える per を指定した場合' do
      let(:variables) { { page: 1, per: 100_000 } }

      it '上限値に丸められる' do
        graphql_post

        expect(response.parsed_body['data']['ideas']['pageInfo']['per']).to eq(described_class::MAX_PER)
      end
    end

    context '0 以下の per を指定した場合' do
      let(:variables) { { page: 0, per: 0 } }

      it '最小値に丸められる' do
        graphql_post
        page_info = response.parsed_body['data']['ideas']['pageInfo']

        expect(page_info['per']).to eq(1)
        expect(page_info['currentPage']).to eq(1)
      end
    end

    context '上限内の per を指定した場合' do
      let(:variables) { { page: 1, per: 2 } }

      it '指定した値が使われる' do
        graphql_post

        expect(response.parsed_body['data']['ideas']['pageInfo']['per']).to eq(2)
      end
    end
  end
end
