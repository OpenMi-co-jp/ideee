module Mutations
    class NotificationConfig::Update < BaseMutation
      graphql_name 'UpdateNotificationConfig'
      
      argument :user_id, ID, required: true, description: 'ユーザーID'
      argument :heart_email, Boolean, required: true, description: 'ハート通知'
      argument :comment_email, Boolean, required: true, description: 'コメント通知'
      argument :draft_remind_email, Boolean, required: true, description: '下書き通知'
      argument :team_join_email, Boolean, required: true, description: 'チーム参加通知'
      argument :team_message_email, Boolean, required: true, description: 'チームメッセージ通知'
      argument :weekly_email, Boolean, required: true, description: '毎週メール通知'
      argument :event_email, Boolean, required: true, description: 'イベント通知'
      argument :heart_web, Boolean, required: true, description: 'ハート通知'
      argument :comment_web, Boolean, required: true, description: 'コメント通知'
      argument :heart_to_comment_web, Boolean, required: true, description: 'ハート通知'
      argument :vote_web, Boolean, required: true, description: '投票通知'
      argument :team_join_web, Boolean, required: true, description: 'チーム参加通知'
      
      field :notification_config, Types::NotificationConfigType, null: false
      field :success, Boolean, null: false
      field :errors, [String], null: true, description: 'エラー'

      def resolve(**args)
        notification_config = ::NotificationConfig.find_by(user_id: args[:user_id])
        notification_config.assign_attributes(args.except(:user_id))
        notification_config.save!
        {
          notification_config:,
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