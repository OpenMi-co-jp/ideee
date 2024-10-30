module Mutations
  class Message::Create < BaseMutation
    graphql_name 'CreateMessage'

    argument :content, String, required: true, description: '【必須】メッセージ内容'
    argument :team_id, ID, required: true, description: '【必須】アイデアID'

    field :message, Types::MessageType, null: true, description: 'コメントオブジェクト'
    field :success, Boolean, null: false, description: '成功フラグ'
    field :errors, [String], null: true, description: 'エラーメッセージのリスト'

    def resolve(**args)
      team = ::Team.find_by(id: args[:team_id])
      raise GraphQL::ExecutionError, 'チームが見つかりません' if team.nil?

      message = team.room.messages.create!(
        user_id: context[:current_user].id,
        content: args[:content],
        room_id: team.room.id
      )
      NotificationMessageJob.perform_later(message)
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
