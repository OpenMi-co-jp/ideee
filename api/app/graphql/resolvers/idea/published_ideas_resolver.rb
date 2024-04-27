module Resolvers
  class Idea::PublishedIdeasResolver < BaseResolver
    graphql_name 'GetPublishedIdeas'
    include Resolvers::Concerns::Pagination
    type Types::Idea::IdeasType, null: false

    argument :id, ID, required: true, description: 'ユーザーID'

    def resolve(**args)
      user = ::User.find(args[:id])
      raise GraphQL::ExecutionError, 'ユーザーが見つかりません' if user.nil?

      published_ideas = user.ideas.published.eager_load(:user).preload(:idea_tags).order(created_at: :desc)
      to_paged_result(Kaminari.paginate_array(published_ideas).page(args[:page]).per(args[:per]))
    end
  end
end
