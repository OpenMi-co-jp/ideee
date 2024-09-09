# frozen_string_literal: true

module Resolvers
  class Idea::AiIdeasResolver < BaseResolver
    graphql_name 'GetAiIdeaTitles'

    type [Types::Idea::AiIdeasType], null: false

    def resolve
      Rails.cache.fetch('daily_idea_titles', expires_in: 1.day) do
        AI::IdeasJob.perform_now
      end
    end
  end
end
