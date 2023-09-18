# frozen_string_literal: true

module Types
  class SortConditionType < Types::BaseInputObject
    argument :column_name, String, required: true, description: 'カラム名'
    argument :order, String, required: false, default_value: 'desc', description: 'ソート順'

    def to_ransack_condition
      "#{column_name.underscore} #{order}"
    end
  end
end
