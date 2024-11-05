class ChangeIdeaLikesNumToLikesCount < ActiveRecord::Migration[7.0]
  def change
    change_table :ideas, bulk: true do |t|
      t.remove :likes_num, :integer, comment: 'いいねの数'
      t.integer :likes_count, null: false, default: 0, comment: 'いいねの数'
    end
  end
end
