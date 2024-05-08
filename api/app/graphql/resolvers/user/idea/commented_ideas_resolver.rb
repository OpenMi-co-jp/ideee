module Resolvers
  class User::Idea::CommentedIdeasResolver < BaseResolver
    graphql_name 'GetCommentedIdeas'
    include Resolvers::Concerns::Pagination
    type Types::Idea::IdeasType, null: false

    argument :user_id, ID, required: true, description: 'ユーザーID'

    def resolve(**args)
      user = ::User.find(args[:user_id])
      commented_ideas = user.comment_ideas.preload(:user, :idea_tags).others_ideas(user)
      to_paged_result(Kaminari.paginate_array(commented_ideas).page(args[:page]).per(args[:per]))
    end
  end
end
