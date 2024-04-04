module Mutations
  class Comment::Update < BaseMutation
    graphql_name 'UpdateComment'

    argument :id, ID, required: true, description: 'コメントID'
    argument :description, String, required: true, description: 'コメント'

    field :comment, Types::CommentType, null: true, description: 'コメントオブジェクト'
    field :success, Boolean, null: false, description: '成功フラグ'
    field :errors, [String], null: true, description: 'エラーメッセージのリスト'

    def resolve(**args)
      comment = ::Comment.find_by(id: args[:id])
      raise GraphQL::ExecutionError, 'コメントが見つかりません' if comment.nil?
      unless comment.user_id == context[:current_user].id
        raise GraphQL::ExecutionError, '権限がありません'
      end

      comment.update!(description: args[:description])
      {
        comment:,
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
