# frozen_string_literal: true

module Resolvers
  class Idea::AiIdeaTitlesResolver < BaseResolver
    graphql_name 'GetAiIdeaTitles'

    type [Types::Idea::AiIdeaTitlesType], null: false

    def resolve
      cached_data['titles'] || []
    end

    def cached_data
      Rails.cache.fetch('daily_idea_title', expires_in: 1.day) do
        AI::IdeaTitlesJob.perform_now
      end
    end
  end
end
