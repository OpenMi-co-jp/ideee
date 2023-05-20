# frozen_string_literal: true

class AddLikesNumToIdea < ActiveRecord::Migration[6.1]
  def change
    add_column :ideas, :likes_num, :integer, default: 0
  end
end
