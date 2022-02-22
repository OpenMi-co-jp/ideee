class ChangeIdeasNullFalse < ActiveRecord::Migration[6.1]
  def up
    change_column :ideas, :background, :string, null: true
    change_column :ideas, :goal, :string, null: true
  end

  def down
    change_column :ideas, :background, :string, null: false
    change_column :ideas, :goal, :string, null: false
  end
end
