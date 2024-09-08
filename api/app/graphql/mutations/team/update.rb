module Mutations
  class Team::Update < BaseMutation
    graphql_name 'UpdateTeam'

    argument :id, ID, required: true, description: 'チームID'
    argument :owner_id, ID, required: true, description: '【必須】オーナーID'
    argument :idea_id, ID, required: true, description: '【必須】アイデアID'
    argument :status, Integer, required: false, description: 'チームステータス'
    argument :requirement, String, required: false, description: 'お願いすること'
    argument :offer, String, required: false, description: '(メンバーが)得られるもの'

    field :team, Types::TeamType, null: false, description: 'チームオブジェクト'
    field :success, Boolean, null: false, description: '成功フラグ'
    field :errors, [String], null: true, description: 'エラーリスト'

    def resolve(**args)
      if context[:current_user].id != args[:owner_id].to_i
        return { success: false, errors: ['ユーザーの権限がありません'] }
      end

      team = ::Team.find(args[:id])
      team.update!(
        owner_id: args[:owner_id],
        idea_id: args[:idea_id],
        status: args[:status],
        requirement: args[:requirement],
        offer: args[:offer]
      )
      {
        team:,
        success: true
      }
    end
  end
end
