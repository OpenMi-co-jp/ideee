module Mutations
  class Team::Create < BaseMutation
    graphql_name 'CreateTeam'

    argument :owner_id, ID, required: true, description: '【必須】オーナーID'
    argument :idea_id, ID, required: true, description: '【必須】アイデアID'
    argument :requirement, String, required: true, description: '【必須】お願いすること'
    argument :offer, String, required: true, description: '【必須】(メンバーが)得られるもの'

    field :team, Types::TeamType, null: false, description: 'チームオブジェクト'
    field :success, Boolean, null: false, description: '成功フラグ'
    field :errors, [String], null: true, description: 'エラーリスト'

    def resolve(**args)
      if context[:current_user].id != args[:owner_id].to_i
        return { success: false, errors: ['ユーザーの権限がありません'] }
      end

      team = ::Team.new(
        owner_id: args[:owner_id],
        idea_id: args[:idea_id],
        requirement: args[:requirement],
        offer: args[:offer]
      )
      team.save!
      {
        team:,
        success: true
      }
    end
  end
end
