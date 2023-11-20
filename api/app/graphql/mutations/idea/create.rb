module Mutations
  class Idea::Create < BaseMutation
    graphql_name 'CreateIdea'

    argument :icon, String, required: false, description: 'アイデアアイコン'
    argument :user_id, ID, required: true, description: '【必須】ユーザーID'
    argument :name, String, required: true, description: '【必須】アイデア名'
    argument :background, String, required: true, description: '【必須】背景'
    argument :goal, String, required: true, description: '【必須】ゴール'
    argument :issue, String, required: false, description: '課題・困っていること'
    argument :hypothesis, String, required: false, description: '仮説'
    argument :monetize, String, required: false, description: 'マネタイズ方法'
    argument :similar, String, required: false, description: '類似サービス'
    argument :stance, Integer, required: false, description: '権利スタンス'
    argument :target, String, required: false, description: 'ターゲット'
    argument :wish_function, String, required: false, description: '欲しい機能'
    argument :github_url, String, required: false, description: 'GithubリポジトリURL'
    argument :product_url, String, required: false, description: '作っているアプリのURL'
    argument :draft, Boolean, required: false, description: '下書きフラグ'

    field :idea, Types::Idea::IdeaType, null: false, description: 'アイデアオブジェクト'
    field :success, Boolean, null: false, description: '成功フラグ'

    def resolve(**args)
      idea = ::Idea.new(
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
        draft: args[:draft],
        user_id: args[:user_id]
        # user_id: context[:current_user].id
      )
      idea.save!
      if idea.save == true
        url = "#{Rails.application.config.host}/ideas/#{idea.id}"
        TwitterJob::Tweet.new.perform(idea, url)
      end
      {
        idea:,
        success: true
      }
    end

    # def resolve(**args, context:)
    #   idea = context[:current_user].ideas.create!(args)
    #   { idea: idea }
    # end
  end
end
