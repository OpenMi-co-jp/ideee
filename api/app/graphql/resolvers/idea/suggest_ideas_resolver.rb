# frozen_string_literal: true

module Resolvers
  class Idea::SuggestIdeasResolver < BaseResolver
    graphql_name 'GetSuggestIdeas'

    argument :idea_id, ID, required: true, description: '【必須】アイデアID'

    type Types::Idea::SuggestIdeasType, null: false

    def resolve(**args)
      idea = ::Idea.find_by(id: args[:idea_id])
      same_tag_ideas = idea.same_tag_ideas
      if same_tag_ideas.length.positive?
        {
          title: '同じタグのアイデア',
          nodes: same_tag_ideas.sample(4)
        }
      # 自分が作成したアイデアが1つ以上ある場合
      elsif idea.same_user_other_ideas.length.positive?
        {
          title: '投稿者の他アイデア',
          nodes: idea.same_user_other_ideas.sample(4)
        }
      else
        {
          title: '他アイデアをのぞいてみる',
          nodes: ::Idea.published.eager_load(%i[idea_tags taggings]).sample(4)
        }
      end
    end
  end
end
