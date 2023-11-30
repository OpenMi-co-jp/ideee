module Mutations
  class Like::Destroy < BaseMutation
    graphql_name 'DestroyLike'

    argument :likable_type, String, required: true, description: 'いいねしたオブジェクトタイプ'
    argument :likable_id, Integer, required: true, description: 'オブジェクトID'

    field :success, Boolean, null: false, description: '成功フラグ'
    field :errors, [String], null: true, description: 'エラーリスト'

    def resolve(**args)
      like = ::Like.find_by(
        user_id: context[:current_user].id,
        likable_type: args[:likable_type],
        likable_id: args[:likable_id]
      )
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
