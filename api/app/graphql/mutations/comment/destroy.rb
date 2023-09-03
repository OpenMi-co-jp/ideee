module Mutations
  class Comment::Destroy < BaseMutation
    graphql_name 'DestroyComment'

    argument :id, ID, required: true, description: 'コメントID'

    field :success, Boolean, null: false, description: '成功フラグ'

    def resolve(**args)
      comment = ::Comment.find_by(id: args[:id])
      comment.destroy!
      {
        success: true
      }
    end
  end
end
