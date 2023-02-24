# frozen_string_literal: true

class AddProductToIdea < ActiveRecord::Migration[6.1]
  def change
    add_column :ideas, :product_url, :string
    add_column :ideas, :product_apply, :integer, default: 0
  end
end
