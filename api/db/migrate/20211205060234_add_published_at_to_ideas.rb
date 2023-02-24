# frozen_string_literal: true

class AddPublishedAtToIdeas < ActiveRecord::Migration[6.1]
  def change
    add_column :ideas, :published_at, :datetime, default: nil
  end
end
