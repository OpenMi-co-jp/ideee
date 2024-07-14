module AiLoggable
  extend ActiveSupport::Concern

  def create_ai_log(user, action, loggable_type, loggable_id)
    ::AiLog.create!(user:, action:, loggable_type:, loggable_id:)
  end
end
