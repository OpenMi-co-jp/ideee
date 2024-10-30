module Mutations
  class Notification::Update < BaseMutation
    graphql_name 'CheckNotifications'

    field :success, Boolean, null: false, description: '成功フラグ'
    field :errors, [String], null: true, description: 'エラー'

    def resolve
      return { success: false, errors: ['ログインしてください'] } if context[:current_user].blank?

      notifications = context[:current_user].passive_notifications&.where(checked: false)
      return { success: false, errors: ['通知がありません'] } if notifications.blank?

      notifications.update!(checked: true)
      { success: true }
    rescue ActiveRecord::RecordInvalid => e
      {
        success: false,
        errors: e.record.errors.full_messages
      }
    end
  end
end
