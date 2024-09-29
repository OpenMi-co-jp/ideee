module Mutations
  class TeamUser::Create < BaseMutation
    graphql_name 'JoinTeam'

    argument :team_id, ID, required: true, description: '【必須】チームID'
    argument :user_id, ID, required: true, description: '【必須】ユーザーID'

    field :team_user, Types::TeamUserType, null: true, description: 'チームユーザーオブジェクト'
    field :success, Boolean, null: false, description: '成功フラグ'
    field :errors, [String], null: true, description: 'エラーリスト'

    def resolve(**args)
      team = ::Team.find_by(id: args[:team_id])
      user = ::User.find_by(id: args[:user_id])

      return { success: false, errors: ['存在しないチームID'], team_user: nil } unless team
      return { success: false, errors: ['存在しないユーザーID'], team_user: nil } unless user

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
      begin
        team_user.save!
        {
          team_user:,
          success: true
        }
      rescue ActiveRecord::RecordInvalid => e
        { team_user: nil, success: false, errors: e.record.errors.full_messages }
      end
    end
  end
end
