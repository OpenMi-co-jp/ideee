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
    field :draft_ideas, resolver: Resolvers::Idea::DraftIdeasResolver, description: '下書きアイデア一覧'
    field :suggest_ideas, resolver: Resolvers::Idea::SuggestIdeasResolver, description: 'サジェストアイデア一覧'
    field :ai_ideas, resolver: Resolvers::Idea::AiIdeasResolver, description: 'AIによるアイデア一覧'
    field :published_ideas, resolver: Resolvers::User::Idea::PublishedIdeasResolver, description: '公開アイデア一覧'
    field :commented_ideas, resolver: Resolvers::User::Idea::CommentedIdeasResolver, description: 'コメントアイデア一覧'
    field :liked_ideas, resolver: Resolvers::User::Idea::LikedIdeasResolver, description: 'いいねしたアイデア一覧'
    field :idea_ids, resolver: Resolvers::Idea::IdeaIdsResolver, description: 'ユーザーのアイデアID一覧'
    field :idea_count, resolver: Resolvers::Idea::IdeaCountResolver, description: 'アイデア総数'

    field :user, resolver: Resolvers::User::UserResolver, description: 'ユーザーオブジェクト'
    field :user_ranking, resolver: Resolvers::User::RankingResolver, description: 'ユーザーランキング'
    field :user_count, resolver: Resolvers::User::UserCountResolver, description: 'ユーザー総数'

    field :notifications, resolver: Resolvers::Notification::NotificationsResolver, description: '通知一覧'
    field :latest_notifications, resolver: Resolvers::Notification::LatestNotificationsResolver, description: '最新の5件の通知一覧'

    field :team, resolver: Resolvers::Team::TeamResolver, description: 'チームオブジェクト'
    field :teams, resolver: Resolvers::Team::TeamsResolver, description: 'チーム一覧'

    field :comment, resolver: Resolvers::Comment::CommentResolver, description: 'コメントオブジェクト'
    field :comments, resolver: Resolvers::Comment::CommentsResolver, description: 'コメント一覧'

    field :room, resolver: Resolvers::Room::RoomResolver, description: 'ルームオブジェクト'
    field :messages, resolver: Resolvers::Message::MessagesResolver, description: 'メッセージ一覧'

    field :tags, resolver: Resolvers::Tag::TagsResolver, description: 'タグ一覧'
    field :popular_tags, resolver: Resolvers::Tag::PopularTagsResolver, description: '人気のタグ一覧'

    field :likes, resolver: Resolvers::Like::LikesResolver, description: 'ユーザーのいいね一覧'

    field :notification_config, resolver: Resolvers::NotificationConfig::NotificationConfigResolver, description: '通知設定'
  end
end
