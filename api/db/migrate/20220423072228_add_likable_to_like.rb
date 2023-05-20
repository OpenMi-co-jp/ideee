# frozen_string_literal: true

class AddLikableToLike < ActiveRecord::Migration[6.1]
  def change
    add_reference :likes, :likable, null: false, polymorphic: true, index: true
  end
end
