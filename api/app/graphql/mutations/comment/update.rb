module Mutations
  class Comment::Update < BaseMutation
    graphql_name 'UpdateComment'

    argument :id, ID, required: true, description: 'コメントID'
    argument :description, String, required: true, description: 'コメント'
    argument :user_id, Integer, required: true, description: '【必須】ユーザーID'
    argument :idea_id, Integer, required: true, description: '【必須】アイデアID'

    field :comment, Types::CommentType, null: false, description: 'コメントオブジェクト'
    field :success, Boolean, null: false, description: '成功フラグ'

    def resolve(**args)
      comment = ::Comment.find(args[:id])
      comment.update!(
        description: args[:description],
        user_id: args[:user_id],
        idea_id: args[:idea_id]
      )
      {
        comment:,
        success: true
      }
    end
  end
end
