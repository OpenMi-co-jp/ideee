module Mutations
  class Comment::Create < BaseMutation
    graphql_name 'CreateComment'

    argument :description, String, null: false
    argument :user_id, Integer, null: false
    argument :idea_id, Integer, null: false

    field :comment, Types::CommentType, null: false, description: 'コメントオブジェクト'
    field :success, Boolean, null: false, description: '成功フラグ'

    def resolve(**args)
      comment = ::Comment.create!(**args)
      {
        comment:,
        success: true
      }
    end
  end
end
