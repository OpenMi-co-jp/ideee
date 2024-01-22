module Mutations
  class Idea::Destroy < BaseMutation
    graphql_name 'DestroyIdea'

    argument :id, ID, required: true, description: 'アイデアID'

    field :success, Boolean, null: false, description: '成功フラグ'

    def resolve(**args)
      idea = ::Idea.find_by(id: args[:id], user_id: context[:current_user].id)
      idea.destroy!
      {
        success: true
      }
    end
  end
end
