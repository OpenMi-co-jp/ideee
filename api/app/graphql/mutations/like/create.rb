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
      notify_user(like)
      {
        like:,
        success: true
      }
    end

    private

    def notify_user(like)
      notification_type = "Like#{like.likable_type}"
      context[:current_user].create_notification_with_notificationable_type(likable_item(like), notification_type)
    end

    def likable_item(like)
      klass = like.likable_type.constantize
      klass.find(like.likable_id)
    end
  end
end
