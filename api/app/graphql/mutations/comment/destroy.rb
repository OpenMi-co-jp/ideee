module Mutations
  class Comment::Destroy < BaseMutation
    graphql_name 'DestroyComment'

    argument :id, ID, required: true, description: 'コメントID'

    field :success, Boolean, null: false, description: '成功フラグ'
    field :errors, [String], null: true, description: 'エラーリスト'

    def resolve(**args)
      comment = ::Comment.find(args[:id])
      unless comment.user_id == context[:current_user].id
        raise GraphQL::ExecutionError, '権限がありません'
      end

      comment.destroy!
      {
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
