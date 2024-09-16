module Mutations
  class Team::Update < BaseMutation
    graphql_name 'UpdateTeam'

    argument :id, ID, required: true, description: 'チームID'
    argument :status, Integer, required: false, description: 'チームステータス'
    argument :requirement, String, required: false, description: 'お願いすること'
    argument :offer, String, required: false, description: '(メンバーが)得られるもの'

    field :team, Types::TeamType, null: true, description: 'チームオブジェクト'
    field :success, Boolean, null: false, description: '成功フラグ'
    field :errors, [String], null: true, description: 'エラーリスト'

    def resolve(**args)
      team = ::Team.find(args[:id])

      if context[:current_user].id != team.owner_id.to_i
        return { success: false, errors: ['ユーザーの権限がありません'] }
      end

      team.update!(
        status: args[:status],
        requirement: args[:requirement],
        offer: args[:offer]
      )
      {
        team:,
        success: true
      }
    rescue ActiveRecord::RecordInvalid => e
      {
        success: false,
        errors: e.record.errors.full_messages
      }
    end
  end
end
