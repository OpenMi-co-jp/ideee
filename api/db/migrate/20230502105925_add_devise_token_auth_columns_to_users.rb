class AddDeviseTokenAuthColumnsToUsers < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :tokens, :json, comment: '認証用トークン'
  end
end
