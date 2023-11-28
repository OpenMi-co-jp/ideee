module Mutations
  class Like::Destroy < BaseMutation
    graphql_name 'DestroyLike'

    argument :id, ID, required: true, description: 'いいねID'

    field :success, Boolean, null: false, description: '成功フラグ'
    field :errors, [String], null: false, description: 'エラーリスト'

    def resolve(**args)
      like = ::Like.find_by(id: args[:id])
      like.destroy!
      {
        success: true
      }
    rescue StandardError => e
      {
        success: false,
        errors: e.record.errors.full_messages
      }
    end
  end
end
