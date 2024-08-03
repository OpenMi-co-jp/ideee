# frozen_string_literal: true

module Resolvers
  class Idea::AiIdeaTitlesResolver < BaseResolver
    graphql_name 'GetAiIdeaTitles'

    type [Types::Idea::AiIdeaTitlesType], null: false

    def resolve
      Rails.cache.fetch('daily_idea_titles', expires_in: 1.day) do
        AI::IdeaTitlesJob.perform_now
      end
    end
  end
end
