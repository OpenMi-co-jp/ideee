# frozen_string_literal: true

module Resolvers
  class Idea::IdeaResolver < BaseResolver
    graphql_name 'GetIdea'

    # レスポンスタイプ
    type Types::IdeaType, null: false

    # リクエストパラメータ
    argument :id, ID, required: true

    def resolve(**args)
      ::Idea.find(args[:id])
    end
  end
end
