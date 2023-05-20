module Mutations
  class User::Update < BaseMutation
    graphql_name 'UpdateUser'

    argument :id, required: true, type: ID, description: 'ユーザーID'
    argument :name, required: true, type: String, description: 'ユーザー名'
    argument :definition, required: true, type: Integer, description: 'タイプ'
    argument :description, required: false, type: String, description: '自己紹介'
    argument :remote_url, required: false, type: String, description: 'アイコンURL'
    argument :site_url, required: false, type: String, description: 'サイトURL'
    argument :twitter_id, required: false, type: String, description: 'TwitterID'
    argument :github_id, required: false, type: String, description: 'githubID'

    field :user, Types::UserType, null: false, description: 'ユーザーオブジェクト'
    field :success, Boolean, null: false, description: '成功フラグ'

    def resolve(**args)
      user = ::User.find(args[:id])
      user.update!(**args)
      {
        user:,
        success: true
      }
    end
  end
end
