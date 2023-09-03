# frozen_string_literal: true

module Resolvers
  class Tag::PopularTagsResolver < BaseResolver
    graphql_name 'GetPopularTags'

    type [Types::TagType], null: false

    def resolve
      ::Tag.recent_tags.popular_tags
    end
  end
end
