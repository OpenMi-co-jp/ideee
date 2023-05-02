class AddDeviseTokenAuthColumnsToUsers < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :tokens, :json, comment: '認証用トークン'
    change_column_default :users, :provider, from: nil, to: 'email'
    change_column_null :users, :provider, false
    change_column_default :users, :uid, from: nil, to: ''
    change_column_null :users, :uid, false
  end
end
