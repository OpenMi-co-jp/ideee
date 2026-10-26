# frozen_string_literal: true

module Resolvers
  class Idea::AiIdeasResolver < BaseResolver
    graphql_name 'GetAiIdeaTitles'

    type [Types::Idea::AiIdeasType], null: false

    CACHE_KEY = 'daily_idea_titles'
    private_constant :CACHE_KEY

    def resolve
      Rails.cache.fetch(CACHE_KEY, expires_in: 1.day, race_condition_ttl: 1.minute) do
        AI::IdeasJob.perform_now
      end
    rescue StandardError
      # 失敗時もしばらく空結果をキャッシュし、未ログインのリクエストごとに OpenAI を呼ばせない
      Rails.cache.write(CACHE_KEY, [], expires_in: 10.minutes)
      []
    end
  end
end
