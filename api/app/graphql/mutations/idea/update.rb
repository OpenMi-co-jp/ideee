module Mutations
  class Idea::Update < BaseMutation
    include Concerns::Idea::Publish

    graphql_name 'UpdateIdea'

    argument :id, ID, required: true, description: 'アイデアID'
    argument :icon, String, required: false, description: 'アイデアアイコン'
    argument :user_id, ID, required: true, description: '【必須】ユーザーID'
    argument :name, String, required: true, description: '【必須】アイデア名'
    argument :background, String, required: true, description: '【必須】背景'
    argument :goal, String, required: true, description: '【必須】ゴール'
    argument :issue, String, required: false, description: '課題・困っていること'
    argument :hypothesis, String, required: false, description: '仮説'
    argument :monetize, String, required: false, description: 'マネタイズ方法'
    argument :similar, String, required: false, description: '類似サービス'
    argument :stance, String, required: true, description: '権利スタンス'
    argument :target, String, required: false, description: 'ターゲット'
    argument :wish_function, String, required: false, description: '欲しい機能'
    argument :github_url, String, required: false, description: 'GithubリポジトリURL'
    argument :product_url, String, required: false, description: '作っているアプリのURL'
    argument :publish, Boolean, required: true, description: '公開フラグ'
    argument :tag_list, [String], required: true, description: 'タグリスト'

    field :idea, Types::Idea::IdeaType, null: true, description: 'アイデアオブジェクト'
    field :success, Boolean, null: false, description: '成功フラグ'
    field :errors, [String], null: true, description: 'エラーリスト'

    def resolve(**args)
      if context[:current_user].id != args[:user_id].to_i
        return { success: false, errors: ['ユーザーの権限がありません'] }
      end

      idea = ::Idea.find(args[:id])
      from_draft = idea.draft?
      idea.assign_attributes(
        icon: args[:icon],
        name: args[:name],
        background: args[:background],
        goal: args[:goal],
        issue: args[:issue],
        wish_function: args[:wish_function],
        hypothesis: args[:hypothesis],
        target: args[:target],
        monetize: args[:monetize],
        similar: args[:similar],
        github_url: args[:github_url],
        stance: args[:stance],
        product_url: args[:product_url],
        draft: !args[:publish],
        user_id: context[:current_user].id
      )
      idea.save_with_tags!(args[:tag_list])
      idea_publish_notify(idea) if from_draft && !idea.draft
      {
        idea:,
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
