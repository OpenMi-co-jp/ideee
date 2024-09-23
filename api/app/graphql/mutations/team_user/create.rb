module Mutations
  class TeamUser::Create < BaseMutation
    graphql_name 'JoinTeam'

    argument :team_id, ID, required: true, description: '【必須】チームID'
    argument :user_id, ID, required: true, description: '【必須】ユーザーID'

    field :team_user, Types::TeamUserType, null: false, description: 'チームユーザーオブジェクト'
    field :success, Boolean, null: false, description: '成功フラグ'
    field :errors, [String], null: true, description: 'エラーリスト'

    def resolve(**args)
      team_user = ::TeamUser.new(
        team_id: args[:team_id],
        user_id: args[:user_id]
      )
      team_user.save!
      {
        team_user:,
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
