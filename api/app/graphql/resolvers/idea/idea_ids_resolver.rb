# frozen_string_literal: true

module Resolvers
  class Idea::IdeaIdsResolver < BaseResolver
    graphql_name 'GetIdeaIds'
    # アイデアのIDリストを返すフィールドを定義
    type Types::Idea::IdeaIdsType, null: false

    def resolve
      { ids: ::Idea.ids }
    end
  end
end
