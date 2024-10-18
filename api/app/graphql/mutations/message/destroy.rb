module Mutations
  class Message::Destroy < BaseMutation
    graphql_name 'DestroyMessage'

    argument :message_id, ID, required: true, description: 'メッセージID'

    field :success, Boolean, null: false, description: '成功フラグ'
    field :errors, [String], null: true, description: 'エラーリスト'

    def resolve(**args)
      message = ::Message.find_by(id: args[:message_id])
      raise GraphQL::ExecutionError, 'メッセージが見つかりません' if message.nil?
      unless message.user_id == context[:current_user].id
        raise GraphQL::ExecutionError, '権限がありません'
      end

      message.destroy!
      {
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
