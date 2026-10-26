require 'rails_helper'

RSpec.describe 'GraphQL query limits' do
  subject(:graphql_post) { post graphql_path, params: { query: }, as: :json }

  let(:res) { response.parsed_body }

  context '深くネストしたクエリのとき' do
    let(:query) do
      nested = 'id'
      6.times { nested = "team { idea { #{nested} } }" }
      "query { idea(id: 1) { #{nested} } }"
    end

    it '実行せずにエラーを返す' do
      graphql_post
      expect(res['errors'][0]['message']).to include('exceeds max depth')
    end
  end

  context 'エイリアスで大量に展開したクエリのとき' do
    let(:query) do
      fields = Array.new(200) { |i| "a#{i}: ideas { nodes { id name } }" }.join(' ')
      "query { #{fields} }"
    end

    it '実行せずにエラーを返す' do
      graphql_post
      expect(res['errors'][0]['message']).to include('exceeds max complexity')
    end
  end

  context '1ページの件数に大きな値を指定したとき' do
    let(:query) { 'query { ideas(per: 100000) { pageInfo { per } } }' }

    it '上限の件数に丸める' do
      graphql_post
      expect(res['data']['ideas']['pageInfo']['per']).to eq(50)
    end
  end

  # front/ を含まない環境（Docker の CI など）では実行しない
  describe 'フロントエンドのクエリ', if: Rails.root.glob('../front/src/lib/graphql/docs/*.gql').any? do
    let(:document)   { GraphQL.parse(Rails.root.glob('../front/src/lib/graphql/docs/*.gql').map { File.read(it) }.join("\n")) }
    let(:fragments)  { document.definitions.grep(GraphQL::Language::Nodes::FragmentDefinition) }
    let(:operations) { document.definitions.grep(GraphQL::Language::Nodes::OperationDefinition) }

    def over_limit?(operation)
      doc = GraphQL::Language::Nodes::Document.new(definitions: [operation] + fragments)
      query = GraphQL::Query.new(IdeeeSchema, document: doc)
      depth, complexity = GraphQL::Analysis.analyze_query(query, [GraphQL::Analysis::QueryDepth, GraphQL::Analysis::QueryComplexity])
      depth > IdeeeSchema.max_depth || complexity > IdeeeSchema.max_complexity
    end

    it 'すべてスキーマの上限内に収まる' do
      expect(operations.filter_map { it.name if over_limit?(it) }).to be_empty
    end
  end
end
