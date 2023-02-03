# frozen_string_literal: true

class CreateAnalytics < ActiveRecord::Migration[6.1]
  def change
    create_table :analytics, &:timestamps
  end
end
