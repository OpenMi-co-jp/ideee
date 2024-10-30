module Mutations
  class Message::Update < BaseMutation
    graphql_name 'UpdateMessage'

    argument :message_id, ID, required: true, description: 'メッセージID'
    argument :content, String, required: true, description: 'メッセージ内容'

    field :message, Types::MessageType, null: true, description: 'メッセージオブジェクト'
    field :success, Boolean, null: false, description: '成功フラグ'
    field :errors, [String], null: true, description: 'エラーメッセージのリスト'

    def resolve(**args)
      message = ::Message.find_by(id: args[:message_id])
      raise GraphQL::ExecutionError, 'メッセージが見つかりません' if message.nil?
      unless message.user_id == context[:current_user].id
        raise GraphQL::ExecutionError, '権限がありません'
      end

      message.update!(content: args[:content])
      {
        message:,
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
