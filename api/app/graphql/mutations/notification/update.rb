module Mutations
  class Notification::Update < BaseMutation
    graphql_name 'CheckNotifications'

    field :success, Boolean, null: false, description: '成功フラグ'
    field :errors, [String], null: true, description: 'エラー'

    def resolve
      if context[:current_user].blank?
        return { success: false, errors: ['ログインしてください'] }
      end

      notifications = context[:current_user].passive_notifications.where(checked: false)
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
