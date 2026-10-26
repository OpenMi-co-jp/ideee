module Mutations
  class Comment::Create < BaseMutation
    graphql_name 'CreateComment'

    argument :description, String, required: true, description: '【必須】コメント'
    argument :idea_id, ID, required: true, description: '【必須】アイデアID'

    field :comment, Types::CommentType, null: true, description: 'コメントオブジェクト'
    field :success, Boolean, null: false, description: '成功フラグ'
    field :errors, [String], null: true, description: 'エラーメッセージのリスト'

    def resolve(**args)
      # 下書きのアイデアにはコメントさせない（存在しないIDはモデルのバリデーションに任せる）
      return { success: false, errors: ['アイデアが見つかりません'] } if ::Idea.exists?(id: args[:idea_id], draft: true)

      comment = ::Comment.new(
        user_id: context[:current_user].id,
        description: args[:description],
        idea_id: args[:idea_id]
      )
      comment.save!
      idea = comment.idea
      context[:current_user].create_notification_comment(idea, comment)
      UserJob::UpdatePointJob.perform_later(context[:current_user])
      SendCommentEmailJob.perform_later(context[:current_user], idea, args[:description])
      {
        comment:,
        success: true
      }
    rescue ActiveRecord::RecordInvalid => e
      {
        success: false,
        errors: e.record.errors.full_messages
      }
    end
  end
end
