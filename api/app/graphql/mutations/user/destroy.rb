module Mutations
  class User::Destroy < BaseMutation
    graphql_name 'DestroyUser'

    argument :id, required: true, type: ID, description: 'ユーザーID'

    field :success, Boolean, null: false, description: '成功フラグ'

    def resolve(**args)
      user = context[:current_user]
      raise GraphQL::ExecutionError, 'ユーザーの権限がありません' if user.id != args[:id].to_i

      user.destroy!
      {
        success: true
      }
    end
  end
end
