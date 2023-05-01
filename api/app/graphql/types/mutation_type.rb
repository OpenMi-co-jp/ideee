module Types
  class MutationType < Types::BaseObject
    field :create_idea, mutation: Mutations::Idea::Create, description: 'アイデア作成'
    field :update_idea, mutation: Mutations::Idea::Update, description: 'アイデア更新'
    field :destroy_idea, mutation: Mutations::Idea::Destroy, description: 'アイデア削除'
  end
end
