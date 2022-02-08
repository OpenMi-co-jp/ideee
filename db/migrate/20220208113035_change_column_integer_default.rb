class ChangeColumnIntegerDefault < ActiveRecord::Migration[6.1]
  def up
    change_column :ideas, :view, :integer, default: 0, null: false
    change_column :users, :point, :integer, default: 0, null: false
  end

  def up
    change_column :users, :point, :integer, default: 0, null: true
    change_column :ideas, :view, :integer, default: 0, null: true
  end
end
