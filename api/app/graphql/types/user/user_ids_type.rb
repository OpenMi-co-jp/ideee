# frozen_string_literal: true

module Types
  class User::UserIdsType < Types::BaseObject
    field :ids, [Integer], null: false, description: 'ユーザーIDリスト'
  end
end
