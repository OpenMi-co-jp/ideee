module Mutations
  class User::Create < BaseMutation
    graphql_name 'CreateUser'

    argument :email, required: true, type: String, description: 'メールアドレス'
    argument :password, required: true, type: String, description: 'パスワード'
    argument :password_confirmation, required: true, type: String, description: 'パスワード確認'

    field :user, Types::UserType, null: false, description: 'ユーザーオブジェクト'
    field :success, Boolean, null: false, description: '成功フラグ'

    def resolve(**args)
      user = ::User.create!(**args)
      {
        user:,
        success: true
      }
    end
  end
end
