# frozen_string_literal: true

module Resolvers
  class Idea::HotIdeasResolver < BaseResolver
    graphql_name 'GetHotIdeas'

    type [Types::Idea::IdeaType], null: false

    def resolve
      new_ideas = ::Idea.published.eager_load(:user).last(4)
      hot_ideas = ::Idea.published.where.not(id: new_ideas.map(&:id)).recent_select.eager_load([:user]).most_liked.first(6)
      new_ideas.concat(hot_ideas).shuffle
    end
  end
end
