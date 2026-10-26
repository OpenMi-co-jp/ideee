module Mutations
  class Like::Create < BaseMutation
    graphql_name 'CreateLike'

    argument :likable_type, String, required: true, description: 'いいねしたオブジェクトタイプ'
    argument :likable_id, Integer, required: true, description: 'オブジェクトID'

    field :like, Types::LikeType, null: false, description: 'いいねのオブジェクト'
    field :success, Boolean, null: false, description: '成功フラグ'

    LIKABLE_TYPES = %w[Idea Comment].freeze
    private_constant :LIKABLE_TYPES

    def resolve(**args)
      raise GraphQL::ExecutionError, 'いいねできない対象です' unless likable_published?(args[:likable_type], args[:likable_id])

      like = ::Like.new(
        likable_type: args[:likable_type],
        user_id: context[:current_user].id,
        likable_id: args[:likable_id]
      )
      like.save!
      UserJob::UpdatePointJob.perform_later(context[:current_user])
      notify_user(like)
      {
        like:,
        success: true
      }
    end

    private

    def likable_published?(likable_type, likable_id)
      case likable_type
      when 'Idea' then ::Idea.published.exists?(id: likable_id)
      when 'Comment' then ::Comment.joins(:idea).merge(::Idea.published).exists?(id: likable_id)
      else false
      end
    end

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
