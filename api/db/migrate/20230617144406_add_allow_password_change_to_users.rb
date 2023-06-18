class AddAllowPasswordChangeToUsers < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :allow_password_change, :boolean, default: false, null: false, comment: 'パスワード変更許可'
  end
end
