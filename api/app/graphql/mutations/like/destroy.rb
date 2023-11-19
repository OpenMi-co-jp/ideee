module Mutations
  class Like::Destroy < BaseMutation
    graphql_name 'DestroyLike'

    argument :likable_type, String, required: true, description: 'リアクション対象のタイプ'
    argument :likable_id, Integer, required: true, description: 'リアクション対象のID'

    field :success, Boolean, null: false, description: '成功フラグ'

    def resolve(**args)
      like = ::Like.find_by(
        likable_type: args[:likable_type],
        user_id: context[:current_user].id,
        likable_id: args[:likable_id]
      )
      like.destroy!
      {
        success: true
      }
    end
  end
end
