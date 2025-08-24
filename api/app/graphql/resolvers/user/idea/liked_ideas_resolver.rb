module Resolvers
  class User::Idea::LikedIdeasResolver < BaseResolver
    graphql_name 'GetLikedIdeas'
    include Resolvers::Concerns::Pagination

    type Types::Idea::IdeasType, null: false

    argument :user_id, ID, required: true, description: 'ユーザーID'

    def resolve(**args)
      user = ::User.find(args[:user_id])
      liked_idea_ids = user.likes.type_idea_ids
      liked_ideas = ::Idea.where(id: liked_idea_ids).eager_load(:idea_tags).preload(:user).order(published_at: :desc)
      to_paged_result(Kaminari.paginate_array(liked_ideas).page(args[:page]).per(args[:per]))
    end
  end
end
