class AddLoggableToAiLogs < ActiveRecord::Migration[7.0]
  def change
    add_reference :ai_logs, :loggable, polymorphic: true, null: false
  end
end
