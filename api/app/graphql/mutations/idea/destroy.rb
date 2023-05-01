module Mutations
  class Idea::Destroy < BaseMutation
    graphql_name 'DestroyIdea'

    argument :id, ID, required: true, description: 'アイデアID'
    argument :user_id, ID, required: true, description: '【必須】ユーザーID'

    field :success, Boolean, null: false, description: '成功フラグ'

    def resolve(**args)
      idea = ::Idea.find_by(id: args[:id], user_id: args[:user_id])
      idea.destroy!
      {
        success: true
      }
    end
  end
end
