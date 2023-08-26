module Mutations
  class Team::Create < BaseMutation
    graphql_name 'CreateTeam'

    argument :owner_id, ID, required: true, description: '【必須】オーナーID'
    argument :idea_id, ID, required: true, description: '【必須】アイデアID'
    argument :status, Integer, required: true, description: '【必須】チームステータス'
    argument :requirement, String, required: true, description: '【必須】お願いすること'
    argument :offer, String, required: true, description: '【必須】(メンバーが)得られるもの'
    argument :members_num, Integer, required: true, description: 'メンバー数'

    field :team, Types::TeamType, null: false, description: 'チームオブジェクト'
    field :success, Boolean, null: false, description: '成功フラグ'

    def resolve(**args)
      team = ::Team.new(
        owner_id, args[:owner_id],
        idea_id, args[:idea_id],
        status, args[:status],
        requirement, args[:requirement],
        offer, args[:offer],
        members_num, args[:members_num]
      )
      team.save!
      {
        team:,
        success: true
      }
    end
  end
end
