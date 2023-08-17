module Types
  class QueryType < Types::BaseObject
    # Add `node(id: ID!) and `nodes(ids: [ID!]!)`
    include GraphQL::Types::Relay::HasNodeField
    include GraphQL::Types::Relay::HasNodesField

    field :idea, resolver: Resolvers::Idea::IdeaResolver, description: 'アイデアオブジェクト'
    field :ideas, resolver: Resolvers::Idea::IdeasResolver, description: 'アイデア一覧'
    field :hot_ideas, resolver: Resolvers::Idea::HotIdeasResolver, description: 'ホットなアイデア一覧'
    field :deployed_ideas, resolver: Resolvers::Idea::DeployedIdeasResolver, description: '実現したアイデア一覧'
    field :active_team_ideas, resolver: Resolvers::Idea::ActiveTeamIdeasResolver, description: 'チーム開発募集中のアイデア一覧'

    field :user, resolver: Resolvers::User::UserResolver, description: 'ユーザーオブジェクト'
    field :users, resolver: Resolvers::User::UsersResolver, description: 'ユーザー一覧'

    field :notifications, resolver: Resolvers::Notification::NotificationsResolver, description: '通知一覧'

    field :team, resolver: Resolvers::Team::TeamResolver, description: 'チームオブジェクト'

    field :popular_tags, resolver: Resolvers::Tag::PopularTagsResolver, description: '人気のタグ一覧'
  end
end
