# frozen_string_literal: true

class AddMonetizeToIdea < ActiveRecord::Migration[6.1]
  def change
    add_column :ideas, :monetize, :string
  end
end
