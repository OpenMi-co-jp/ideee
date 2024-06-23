class CreateAiLogs < ActiveRecord::Migration[7.0]
  def change
    create_table :ai_logs, comment: 'AIログ' do |t|
      t.references :user, null: false, foreign_key: true, description: 'ユーザID'
      t.string :action, null: false, description: 'AIアクション'

      t.timestamps
    end
  end
end
