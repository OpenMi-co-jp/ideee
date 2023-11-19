module Mutations
  class Comment::Create < BaseMutation
    graphql_name 'CreateComment'

    argument :description, String, required: true, description: '【必須】コメント'
    argument :idea_id, String, required: true, description: '【必須】アイデアID'

    field :comment, Types::CommentType, null: true, description: 'コメントオブジェクト'
    field :success, Boolean, null: false, description: '成功フラグ'
    field :errors, [String], null: true, description: 'エラーメッセージのリスト'

    def resolve(**args)
      comment = ::Comment.new(
        user_id: context[:current_user].id,
        description: args[:description],
        idea_id: args[:idea_id]
      )
      if comment.save
        { comment:, success: true }
      else
        { success: false, errors: comment.errors.full_messages }
      end
    rescue ActiveRecord::RecordInvalid => e
      {
        success: false,
        errors: e.record.errors.full_messages
      }
    end
  end
end
