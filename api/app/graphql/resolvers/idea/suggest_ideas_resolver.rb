# frozen_string_literal: true

module Resolvers
  class Idea::SuggestIdeasResolver < BaseResolver
    graphql_name 'GetSuggestIdeas'

    argument :idea_id, ID, required: true, description: '【必須】アイデアID'

    type Types::Idea::SuggestIdeasType, null: false

    def resolve(**args)
      idea = ::Idea.find_by(id: args[:idea_id])
      return { title: 'アイデアが見つかりません', nodes: [] } if idea.nil?

      same_tag_ideas = idea.same_tag_ideas
      if same_tag_ideas.length.positive?
        {
          title: '同じタグのアイデア',
          nodes: same_tag_ideas.order('RAND()').limit(4)
        }
      # 自分が作成したアイデアが1つ以上ある場合
      elsif idea.same_user_other_ideas.length.positive?
        {
          title: "#{idea.user.name}さんの他アイデア",
          nodes: idea.same_user_other_ideas.order('RAND()').limit(4)
        }
      else
        {
          title: '他アイデアをのぞいてみる',
          nodes: ::Idea.published.where.not(id: args[:idea_id]).eager_load(%i[idea_tags taggings]).order('RAND()').limit(4)
        }
      end
    end
  end
end
