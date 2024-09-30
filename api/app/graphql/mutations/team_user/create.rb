module Mutations
  class TeamUser::Create < BaseMutation
    graphql_name 'JoinTeam'

    argument :team_id, ID, required: true, description: '【必須】チームID'

    field :team_user, Types::TeamUserType, null: true, description: 'チームユーザーオブジェクト'
    field :success, Boolean, null: false, description: '成功フラグ'
    field :errors, [String], null: true, description: 'エラーリスト'

    def resolve(**args)
      team = ::Team.find_by(id: args[:team_id])
      return { success: false, errors: ['チームが存在しません'], team_user: nil } unless team

      team_user = ::TeamUser.find_or_initialize_by(team_id: args[:team_id], user_id: context[:current_user].id)

      return { success: false, errors: ['既に参加済み'] } if team_user.persisted?

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
