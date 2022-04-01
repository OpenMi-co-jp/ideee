class AddEmailedAtToIdeas < ActiveRecord::Migration[6.1]
  def change
    add_column :ideas, :emailed_at, :datetime, comment: 'weeklyメールで新規アイデアとして送られた日時'
  end
end
