module Mutations
  class User::Update < BaseMutation
    graphql_name 'UpdateUser'

    argument :id, ID, required: true, description: 'ユーザーID'
    argument :name, String, required: true, description: 'ユーザー名'
    argument :definition, String, required: true, description: 'タイプ'
    argument :description, String, required: false, description: '自己紹介'
    argument :remote_url, String, required: false, description: 'アイコンURL'
    argument :site_url, String, required: false, description: 'サイトURL'
    argument :twitter_id, String, required: false, description: 'TwitterID'
    argument :github_id, String, required: false, description: 'githubID'
    argument :icon, String, required: false, description: 'アイデアアイコン'

    field :user, Types::UserType, null: false, description: 'ユーザーオブジェクト'
    field :success, Boolean, null: false, description: '成功フラグ'
    field :errors, [String], null: true, description: 'エラーリスト'

    def resolve(**args)
      user = ::User.find(args[:id])
      user.update!(**args)
      {
        user:,
        success: true
      }
    rescue ActiveRecord::RecordInvalid => e
      {
        success: false,
        errors: e.record.errors.full_messages
      }
    end
  end
end
