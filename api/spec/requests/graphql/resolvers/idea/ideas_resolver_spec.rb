require 'rails_helper'

RSpec.describe Resolvers::Idea::IdeasResolver do
  describe 'GetIdeas' do
    subject(:graphql_post) { post graphql_path, params: { query:, variables: variables.to_json }, as: :json }

    let(:query) do
      <<-GRAPHQL
        query($searchCondition: SearchCondition, $sort: SortCondition) {
          ideas(searchCondition: $searchCondition, sort: $sort) {
            nodes {
              id
              name
              commentsNum
              stance
              likesCount
              view
              updatedAt
              publishedAt
              user {
                id
                name
                image
              }
              ideaTags {
                name
              }
              team {
                status
                membersNum
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

    describe '検索条件' do
      before { create(:idea) }

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

      context 'スタンスで検索する場合' do
        let!(:idea) { create(:idea, stance: 2) }

        let(:variables) do
          {
            searchCondition: {
              stanceEq: 'team_project'
            }
          }
        end

        it '指定したステータスのアイデアを取得すること' do
          expect(graphql_post).to eq 200
          res_json = response.parsed_body
          expect(res_json['data']['ideas']['nodes'].length).to eq 1
          expect(res_json['data']['ideas']['nodes'].first['stance']).to eq idea[:stance]
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

        it '指定したステータスのアイデアを取得すること' do
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

    describe '並び替え条件' do
      let!(:poor_idea) do
        create(
          :idea,
          likes_count: 1,
          comments_num: 1,
          view: 1,
          published_at: 5.days.ago,
          updated_at: 5.days.ago
        )
      end
      let!(:oldest_idea) do
        create(
          :idea,
          likes_count: 2,
          comments_num: 2,
          view: 2,
          published_at: 10.days.ago,
          updated_at: 10.days.ago
        )
      end
      let!(:popular_idea) do
        create(
          :idea,
          likes_count: 3,
          comments_num: 3,
          view: 3,
          published_at: 3.days.ago,
          updated_at: 3.days.ago
        )
      end

      before do
        create(:team, idea: poor_idea, owner: poor_idea.user, members_num: 1)
        create(:team, idea: oldest_idea, owner: oldest_idea.user, members_num: 2)
        create(:team, idea: popular_idea, owner: popular_idea.user, members_num: 3)
      end

      context 'デフォルトのlikes_count descでソートする場合' do
        let(:variables) do
          {
            searchCondition: {}
          }
        end

        it 'likes_countを降順に並び替えること' do
          expect(graphql_post).to eq 200
          res_json = response.parsed_body
          expect(res_json['data']['ideas']['nodes'].length).to eq 3
          expect(res_json['data']['ideas']['nodes'].first['likesCount']).to eq popular_idea.likes_count
        end
      end

      context 'comments_num ascでソートする場合' do
        let(:variables) do
          {
            searchCondition: {},
            sort: { columnName: 'comments_num', order: 'asc' }
          }
        end

        it 'comments_numを昇順に並び替えること' do
          expect(graphql_post).to eq 200
          res_json = response.parsed_body
          expect(res_json['data']['ideas']['nodes'].length).to eq 3
          expect(res_json['data']['ideas']['nodes'].first['commentsNum']).to eq poor_idea.comments_num
        end
      end

      context 'view ascでソートする場合' do
        let(:variables) do
          {
            searchCondition: {},
            sort: { columnName: 'view', order: 'asc' }
          }
        end

        it 'viewを昇順に並び替えること' do
          expect(graphql_post).to eq 200
          res_json = response.parsed_body
          expect(res_json['data']['ideas']['nodes'].length).to eq 3
          expect(res_json['data']['ideas']['nodes'].first['view']).to eq poor_idea.view
        end
      end

      context 'published_at descでソートする場合' do
        let(:variables) do
          {
            searchCondition: {},
            sort: { columnName: 'published_at', order: 'asc' }
          }
        end

        it 'published_atを降順に並び替えること' do
          expect(graphql_post).to eq 200
          res_json = response.parsed_body
          expect(res_json['data']['ideas']['nodes'].length).to eq 3
          expect(res_json['data']['ideas']['nodes'].first['publishedAt']).to eq oldest_idea.published_at.iso8601
        end
      end

      context 'updated_at ascでソートする場合' do
        let(:variables) do
          {
            searchCondition: {},
            sort: { columnName: 'updated_at', order: 'asc' }
          }
        end

        it 'updated_atを昇順に並び替えること' do
          expect(graphql_post).to eq 200
          res_json = response.parsed_body
          expect(res_json['data']['ideas']['nodes'].length).to eq 3
          expected_time = popular_idea.updated_at.change(sec: 0).iso8601
          expect(res_json['data']['ideas']['nodes'].first['updatedAt'].to_time.change(sec: 0)).to eq expected_time
        end
      end

      context 'team_members_num ascでソートする場合' do
        let(:variables) do
          {
            searchCondition: {},
            sort: { columnName: 'team_members_num', order: 'asc' }
          }
        end

        it 'team_members_numを昇順に並び替えること' do
          expect(graphql_post).to eq 200
          res_json = response.parsed_body
          expect(res_json['data']['ideas']['nodes'].length).to eq 3
          expect(res_json['data']['ideas']['nodes'].first['team']['membersNum']).to eq poor_idea.team.members_num
        end
      end
    end
  end
end
