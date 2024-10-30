# frozen_string_literal: true

module Types
  class Idea::IdeaIdsType < Types::BaseObject
    field :ids, [Integer], null: false, description: 'アイデアIDリスト'
  end
end
