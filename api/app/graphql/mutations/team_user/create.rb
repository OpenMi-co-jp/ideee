module Mutations
  class TeamUser::Create < BaseMutation
    graphql_name 'JoinTeam'

    argument :team_id, ID, required: true, description: '【必須】チームID'
    argument :user_id, ID, required: true, description: '【必須】ユーザーID'

    field :team_user, Types::TeamUserType, null: true, description: 'チームユーザーオブジェクト'
    field :success, Boolean, null: false, description: '成功フラグ'
    field :errors, [String], null: true, description: 'エラーリスト'

    def resolve(**args)
      team_user = ::TeamUser.find_by(team_id: args[:team_id], user_id: args[:user_id])

      if team_user.present?
        return {
          success: false,
          errors: ['既に参加済み']
        }
      end

      team_user = ::TeamUser.new(
        team_id: args[:team_id],
        user_id: args[:user_id]
      )
      team_user.save!
      {
        team_user:,
        success: true
      }
    end
  end
end
