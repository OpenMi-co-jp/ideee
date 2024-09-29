module Mutations
  class TeamUser::Destroy < BaseMutation
    graphql_name 'LeaveTeam'

    argument :team_id, ID, required: true, description: 'チームID'
    argument :user_id, ID, required: true, description: 'ユーザID'

    field :success, Boolean, null: false, description: '成功フラグ'
    field :errors, [String], null: false, description: 'エラーメッセージ'

    def resolve(**args)
      team = ::Team.find_by(id: args[:team_id])
      team_user = ::TeamUser.find_by(team_id: args[:team_id], user_id: args[:user_id])
      if context[:current_user].id != args[:user_id].to_i
        return {
          success: false,
          errors: ['ユーザーの権限がありません']
        }
      end
      return { success: false, errors: ['該当するチームが存在しません'] } unless team

      return unless team_user

      begin
        team_user.destroy!
        {
          success: true,
          errors: []
        }
      rescue ActiveRecord::RecordInvalid => e
        {
          success: false,
          errors: e.record.errors.full_messages
        }
      end
    end
  end
end
