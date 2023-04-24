module Types
  class QueryType < Types::BaseObject
    # Add `node(id: ID!) and `nodes(ids: [ID!]!)`
    include GraphQL::Types::Relay::HasNodeField
    include GraphQL::Types::Relay::HasNodesField

    field :idea, resolver: Resolvers::Idea::IdeaResolver, description: 'アイデアオブジェクト'
    field :ideas, resolver: Resolvers::Idea::IdeasResolver, description: 'アイデア一覧'

    field :user, resolver: Resolvers::User::UserResolver, description: 'ユーザーオブジェクト'
    field :users, resolver: Resolvers::User::UsersResolver, description: 'ユーザー一覧'
  end
end
