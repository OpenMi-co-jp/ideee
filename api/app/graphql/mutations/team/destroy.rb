module Mutations
  class Team::Destroy < BaseMutation
    graphql_name 'DestroyTeam'

    argument :id, ID, required: true, description: 'チームID'

    field :success, Boolean, null: false, description: '成功フラグ'
    field :errors, [String], null: true, description: 'エラーリスト'

    def resolve(**args)
      team = ::Team.find(args[:id])
      if context[:current_user].id != team.owner_id.to_i
        return { success: false, errors: ['ユーザーの権限がありません'] }
      end

      team.destroy!
      {
        success: true
      }
    end
  end
end
