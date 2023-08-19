require 'rails_helper'

RSpec.describe Resolvers::Idea::IdeasResolver do
  describe 'GetIdeas' do
    subject(:graphql_post) { post graphql_path, params: { query:, variables: variables.to_json } }

    let(:query) do
      <<-GRAPHQL
        query($searchCondition: SearchCondition) {
          ideas(searchCondition: $searchCondition) {
            nodes {
              id
              name
              commentsNum
              difficulty
              likesNum
              view
              publishedAt
              user {
                id
                name
                icon
              }
              ideaTags {
                name
              }
              team {
                status
              }
            }
            pageInfo {
              currentPage
              isFirst
              isLast
              nextPage
              per
              prevPage
              totalCount
              totalPages
            }
          }
        }
      GRAPHQL
    end

    before { create(:idea) }

    describe '検索条件' do
      context '名前かタグ名で検索する場合' do
        before { create(:idea, name: 'テスト1') }

        let(:random_name_idea) { create(:idea, name: 'xxxx_2') }
        let(:tag)              { create(:tag, name: 'テスト2') }
        before { create(:tagging, idea: random_name_idea, tag:) }

        let(:variables) do
          {
            searchCondition: {
              nameOrIdeaTagsNameCont: 'テスト'
            }
          }
        end

        it 'アイデア名とタグ名を含むアイデアを取得すること' do
          expect(graphql_post).to eq 200
          res_json = response.parsed_body
          expect(res_json['data']['ideas']['nodes'].length).to eq 2
        end
      end

      context '難易度で検索する場合' do
        let!(:idea) { create(:idea, difficulty: 2) }

        let(:variables) do
          {
            searchCondition: {
              difficultyEq: 2
            }
          }
        end

        it '指定した難易度のアイデアを取得すること' do
          expect(graphql_post).to eq 200
          res_json = response.parsed_body
          expect(res_json['data']['ideas']['nodes'].length).to eq 1
          expect(res_json['data']['ideas']['nodes'].first['difficulty']).to eq idea[:difficulty]
        end
      end

      context 'チーム開発のステータスで検索する場合' do
        let(:idea_team_active) { create(:idea) }
        let(:idea_team_stop)   { create(:idea) }
        before { create(:team, idea: idea_team_active, owner: idea_team_active.user, status: 0) }

        let!(:team) { create(:team, idea: idea_team_stop, owner: idea_team_stop.user, status: 1) }

        let(:variables) do
          {
            searchCondition: {
              teamStatusEq: 1
            }
          }
        end

        it '指定した難易度のアイデアを取得すること' do
          expect(graphql_post).to eq 200
          res_json = response.parsed_body
          expect(res_json['data']['ideas']['nodes'].length).to eq 1
          expect(res_json['data']['ideas']['nodes'].first['team']['status']).to eq team.status
        end
      end

      context '指定公開日以降で検索する場合' do
        let!(:idea) { create(:idea, published_at: 3.days.ago) }
        before { create(:idea, published_at: 12.days.ago) }

        let(:variables) do
          {
            searchCondition: {
              publishedAtGteq: 10.days.ago,
              publishedAtLteq: 2.days.ago
            }
          }
        end

        it '指定日以降のアイデアを取得すること' do
          expect(graphql_post).to eq 200
          res_json = response.parsed_body
          expect(res_json['data']['ideas']['nodes'].length).to eq 1
          expect(Date.parse(res_json['data']['ideas']['nodes'].first['publishedAt'])).to be >= idea.published_at.to_date
        end
      end
    end
  end
end
