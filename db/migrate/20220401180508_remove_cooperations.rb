class RemoveCooperations < ActiveRecord::Migration[6.1]
  def change
    drop_table :cooperations do |t|
      t.references :user, null: false, foreign_key: true
      t.references :idea, null: false, foreign_key: true
    end
    remove_column :ideas, :cooperation, :integer, default: 0
  end
end
