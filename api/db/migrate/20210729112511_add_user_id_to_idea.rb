# frozen_string_literal: true

class AddUserIdToIdea < ActiveRecord::Migration[6.1]
  def up
    add_reference :ideas, :user, null: false, index: true
  end

  def down
    remove_reference :ideas, :user, index: true
  end
end
