# frozen_string_literal: true

class AddDifficultyToIdea < ActiveRecord::Migration[6.1]
  def change
    add_column :ideas, :difficulty, :integer, default: 0
  end
end
