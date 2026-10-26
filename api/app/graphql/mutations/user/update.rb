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

    field :user, Types::UserType, null: true, description: 'ユーザーオブジェクト'
    field :success, Boolean, null: false, description: '成功フラグ'
    field :errors, [String], null: true, description: 'エラーリスト'

    def resolve(**args)
      user = context[:current_user]
      return { success: false, errors: ['ユーザーの権限がありません'] } if user.id != args[:id].to_i

      user.update!(**args.except(:id))
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
