module Types
  class QueryType < Types::BaseObject
    # Add `node(id: ID!) and `nodes(ids: [ID!]!)`
    include GraphQL::Types::Relay::HasNodeField
    include GraphQL::Types::Relay::HasNodesField

    field :idea, resolver: Resolvers::Idea::IdeaResolver, description: 'アイデアオブジェクト'
    field :ideas, resolver: Resolvers::Idea::IdeasResolver, description: 'アイデア一覧'

    field :user, resolver: Resolvers::User::UserResolver, description: 'ユーザーオブジェクト'
    field :users, resolver: Resolvers::User::UsersResolver, description: 'ユーザー一覧'

    field :notifications, resolver: Resolvers::Notification::NotificationsResolver, description: '通知一覧'

    field :team, resolver: Resolvers::Team::TeamResolver, description: 'チームオブジェクト'

    field :comment, resolver: Resolvers::Comment::CommentResolver, description: 'コメントオブジェクト'
    field :comments, resolver: Resolvers::Comment::CommentsResolver, description: 'コメント一覧'

    field :room, resolver: Resolvers::Room::RoomResolver, description: 'ルームオブジェクト'

    field :popular_tags, resolver: Resolvers::Tag::PopularTagsResolver, description: '人気のタグ一覧'

  end
end
