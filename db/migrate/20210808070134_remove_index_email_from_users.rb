class RemoveIndexEmailFromUsers < ActiveRecord::Migration[6.1]
  def up
    remove_index :users, :email
  end

  def down
    add_index :user, :email, unique: true
  end
end
