module Mutations
  class Like::Create < BaseMutation
    graphql_name 'CreateLike'

    argument :likable_type, String, required: true, description: 'いいねしたオブジェクトタイプ'
    argument :likable_id, Integer, required: true, description: 'オブジェクトID'

    field :like, Types::LikeType, null: false, description: 'いいねのオブジェクト'
    field :success, Boolean, null: false, description: '成功フラグ'

    def resolve(**args)
      like = ::Like.new(
        likable_type: args[:likable_type],
        user_id: context[:current_user].id,
        likable_id: args[:likable_id]
      )
      like.save!
      {
        like:,
        success: true
      }
    end
  end
end
