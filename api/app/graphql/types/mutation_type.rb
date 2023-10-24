module Types
  class MutationType < Types::BaseObject
    field :create_team, mutation: Mutations::Team::Create, description: 'チーム作成'
    field :update_team, mutation: Mutations::Team::Update, description: 'チーム更新'
    field :destroy_team, mutation: Mutations::Team::Destroy, description: 'チーム削除'
    field :create_idea, mutation: Mutations::Idea::Create, description: 'アイデア作成'
    field :update_idea, mutation: Mutations::Idea::Update, description: 'アイデア更新'
    field :destroy_idea, mutation: Mutations::Idea::Destroy, description: 'アイデア削除'
    field :create_user, mutation: Mutations::User::Create, description: 'ユーザー作成'
    field :update_user, mutation: Mutations::User::Update, description: 'ユーザー更新'
    field :destroy_user, mutation: Mutations::User::Destroy, description: 'ユーザー削除'
    field :create_comment, mutation: Mutations::Comment::Create, description: 'コメント作成'
    field :update_comment, mutation: Mutations::Comment::Update, description: 'コメント更新'
    field :destroy_comment, mutation: Mutations::Comment::Destroy, description: 'コメント削除'
    field :create_like, mutation: Mutations::Like::Create, description: 'いいね作成'
    field :destroy_like, mutation: Mutations::Like::Destroy, description: 'いいね削除'
    field :create_difficulty, mutation: Mutations::Difficulty::Create, description: '難易度作成'
  end
end
