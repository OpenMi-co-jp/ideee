require 'rails_helper'

RSpec.describe Resolvers::Notification::DropdownNotificationsResolver do
  describe 'GetNotifications' do
    let(:query) do
      <<~GRAPHQL
        query DropdownNotifications {
          latestNotifications {
            id
            createdAt
          }
        }
      GRAPHQL
    end

    let(:user)   { create(:user) }
    let(:tokens) { sign_in(user) }

    before do
      create_list(:notification, 10, visited_id: user.id, created_at: rand(1..5).days.ago + rand(1..24).hours)
      post graphql_path, params: { query: }, headers: tokens
    end

    it '5件の通知が表示される' do
      res_json = response.parsed_body
      result = res_json['data']['latestNotifications']

      expect(result.count).to eq(5)
    end

    it '通知が降順で表示される' do
      res_json = response.parsed_body
      result = res_json['data']['latestNotifications']

      created_at_values = result.map { |notification| Time.zone.parse(notification['createdAt']) }
      created_at_values = created_at_values.sort
      sorted_created_at_values = created_at_values.reverse

      expect(created_at_values).to eq(sorted_created_at_values)
    end
  end
end
