# frozen_string_literal: true

module Resolvers
  class Idea::DraftIdeasResolver < BaseResolver
    graphql_name 'GetDraftIdeas'
    include Resolvers::Concerns::Pagination

    type Types::Idea::IdeasType, null: false

    def resolve(**args)
      draft_ideas = context[:current_user].ideas.where(draft: true).includes(:user, :idea_tags)
      to_paged_result(Kaminari.paginate_array(draft_ideas).page(args[:page]).per(args[:per]))
    end
  end
end
