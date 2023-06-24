class DeviseCreateAdminUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :admin_users, comment: 'Table of admin user' do |t|
      t.string :email,              null: false, default: ''
      t.string :encrypted_password, null: false, default: ''
      t.string   :reset_password_token
      t.datetime :reset_password_sent_at
      t.datetime :remember_created_at

      t.timestamps null: false
    end

    change_table :admin_users, bulk: true do |t|
      t.index %i[email reset_password_token], unique: true
    end
  end
end
