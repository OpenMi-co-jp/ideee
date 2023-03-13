# frozen_string_literal: true

class ChangeIdeaColumns < ActiveRecord::Migration[6.1]
  def change
    add_column :ideas, :background, :string, null: false
    add_column :ideas, :goal, :string, null: false
    add_column :ideas, :issue, :string
    add_column :ideas, :wish_function, :string
    add_column :ideas, :hypothesis, :string
    add_column :ideas, :target, :string
    add_column :ideas, :similar, :string
  end
end
