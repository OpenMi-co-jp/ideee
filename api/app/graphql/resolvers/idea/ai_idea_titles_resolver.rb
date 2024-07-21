# frozen_string_literal: true

module Resolvers
  class Idea::AiIdeaTitlesResolver < BaseResolver
    graphql_name 'GetAiIdeaTitles'

    type [Types::Idea::AiIdeaTitlesType], null: false

    def resolve
      cached_data = Rails.cache.read('daily_idea_titles') || {}
      puts cached_data
      titles = cached_data['titles'] || []
      titles
    end
  end
end
