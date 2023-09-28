module Mutations
  class Like::Destroy < BaseMutation
    graphql_name 'DestroyLike'

    argument :id, ID, required: true, description: 'いいねID'

    field :success, Boolean, null: false, description: '成功フラグ'

    def resolve(**args)
      like = ::Like.find_by(id: args[:id])
      like.destroy!
      {
        success: true
      }
    end
  end
end
