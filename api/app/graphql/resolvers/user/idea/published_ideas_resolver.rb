module Resolvers
  class User::Idea::PublishedIdeasResolver < BaseResolver
    graphql_name 'GetPublishedIdeas'
    include Resolvers::Concerns::Pagination

    type Types::Idea::IdeasType, null: false

    argument :user_id, ID, required: true, description: 'ユーザーID'

    def resolve(**args)
      user = ::User.find(args[:user_id])
      published_ideas = user.ideas.published.includes(:user, :idea_tags)
      to_paged_result(Kaminari.paginate_array(published_ideas).page(args[:page]).per(args[:per]))
    end
  end
end
