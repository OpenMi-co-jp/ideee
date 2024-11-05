class ChangeIdeaLikesNumToLikesCount < ActiveRecord::Migration[7.0]
  def change
    change_table :ideas, bulk: true do |t|
      remove_column :ideas, :likes_num, :integer, null: false, default: 0, comment: 'いいねの数'
      t.integer :likes_count, null: false, default: 0, comment: 'いいねの数'
    end
  end
end
