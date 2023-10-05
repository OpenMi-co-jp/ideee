# frozen_string_literal: true

module Resolvers
  class Tag::TagsResolver < BaseResolver
    graphql_name 'GetTags'

    type [Types::TagType], null: false

    def resolve
      ::Tag.order(Arel.sql('RAND()'))
    end
  end
end
