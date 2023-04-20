module Types
  class QueryType < Types::BaseObject
    # Add `node(id: ID!) and `nodes(ids: [ID!]!)`
    include GraphQL::Types::Relay::HasNodeField
    include GraphQL::Types::Relay::HasNodesField

    field :idea, resolver: Resolvers::Idea::IdeaResolver
    # field :ideas, resolver: Resolvers::Ideas::IdeaResolver
  end
end
