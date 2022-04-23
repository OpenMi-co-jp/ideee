class AddLikableToLike < ActiveRecord::Migration[6.1]
  def change
    add_column :likes, :likable_id, :integer
    add_column :likes, :likable_type, :string
    add_index :likes, %i[likable_id likable_type]
  end
end
