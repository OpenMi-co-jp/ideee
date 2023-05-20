module Mutations
  class User::Destroy < BaseMutation
    graphql_name 'DestroyUser'

    argument :id, required: true, type: ID, description: 'ユーザーID'

    field :success, Boolean, null: false, description: '成功フラグ'

    def resolve(**args)
      user = ::User.find(args[:id])
      user.destroy!
      {
        success: true
      }
    end
  end
end
