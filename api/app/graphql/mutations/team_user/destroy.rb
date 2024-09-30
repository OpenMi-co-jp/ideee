module Mutations
  class TeamUser::Destroy < BaseMutation
    graphql_name 'LeaveTeam'

    argument :team_id, ID, required: true, description: 'チームID'

    field :success, Boolean, null: false, description: '成功フラグ'
    field :errors, [String], null: false, description: 'エラーメッセージ'

    def resolve(**args)
      team = ::Team.find_by(id: args[:team_id])
      return { success: false, errors: ['チームが存在しません'], team_user: nil } unless team

      team_user = ::TeamUser.find_by(team_id: args[:team_id], user_id: context[:current_user].id)
      return { success: false, errors: ['チームに参加していません'] } unless team_user

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
