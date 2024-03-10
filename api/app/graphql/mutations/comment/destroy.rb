module Mutations
  class Comment::Destroy < BaseMutation
    graphql_name 'DestroyComment'

    argument :id, ID, required: true, description: 'コメントID'

    field :success, Boolean, null: false, description: '成功フラグ'

    def resolve(**args)
      comment = ::Comment.find(args[:id])
      unless comment.user_id == context[:current_user].id
        raise GraphQL::ExecutionError, '権限がありません'
      end

      comment.destroy!
      {
        success: true
      }
    end
  end
end
