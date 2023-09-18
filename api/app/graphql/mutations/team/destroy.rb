module Mutations
  class Team::Destroy < BaseMutation
    graphql_name 'DestroyTeam'

    argument :id, ID, required: true, description: 'チームID'

    field :success, Boolean, null: false, description: '成功フラグ'

    def resolve(**args)
      team = ::Team.find(args[:id])
      team.destroy!
      {
        success: true
      }
    end
  end
end
