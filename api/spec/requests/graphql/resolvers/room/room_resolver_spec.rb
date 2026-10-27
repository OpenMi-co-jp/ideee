# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Resolvers::Room::RoomResolver do
  subject(:graphql_post) { post graphql_path, params: { query:, variables: variables.to_json }, headers:, as: :json }

  let(:team) { create(:team).reload }
  let(:room) { team.room }

  let(:query) do
    <<-GRAPHQL
      query($id: ID!) {
        room(id: $id) {
          id
          teamId
        }
      }
    GRAPHQL
  end
  let(:variables) { { id: room.id } }

  describe 'GetRoom' do
    context '未ログインの場合' do
      let(:headers) { {} }

      it 'ルームを取得できない' do
        graphql_post
        res = response.parsed_body

        expect(res['data']['room']).to be_nil
        expect(res['errors'].first['message']).to eq('Authentication required')
      end
    end

    context 'チームに参加していないユーザーの場合' do
      let(:headers) { sign_in(create(:user)) }

      it 'ルームの存在を知ることができない' do
        graphql_post
        res = response.parsed_body

        expect(res['data']['room']).to be_nil
        expect(res['errors'].first['message']).to eq('ルームが見つかりません')
      end
    end

    context 'チームのオーナーの場合' do
      let(:headers) { sign_in(team.owner) }

      it 'ルームを取得できる' do
        graphql_post
        res = response.parsed_body

        expect(res['data']['room']['id']).to eq(room.id)
      end
    end

    context 'チームのメンバーの場合' do
      let(:member) { create(:user) }
      let(:headers) { sign_in(member) }

      before { create(:team_user, team:, user: member) }

      it 'ルームを取得できる' do
        graphql_post
        res = response.parsed_body

        expect(res['data']['room']['id']).to eq(room.id)
      end
    end
  end
end
