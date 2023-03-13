# frozen_string_literal: true

class AddRecruitmentToIdeas < ActiveRecord::Migration[6.1]
  def change
    add_column :ideas, :cooperation, :integer, default: 0
  end
end
