module Resolvers
  class Idea::PublishedIdeasResolver < BaseResolver
    graphql_name 'GetPublishedIdeas'
    include Resolvers::Concerns::Pagination
    type Types::Idea::IdeasType, null: false

    def resolve(**args)
      current_user = context[:current_user]
      published_ideas = current_user.ideas.published.eager_load(:user).preload(:idea_tags).order(created_at: :desc)
      to_paged_result(Kaminari.paginate_array(published_ideas).page(args[:page]).per(args[:per]))
    end
  end
end
