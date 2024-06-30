# frozen_string_literal: true

module Resolvers
  class Idea::IdeasResolver < BaseResolver
    graphql_name 'GetIdeas'
    include Resolvers::Concerns::Pagination

    argument :search_condition, Types::Idea::SearchConditionType, required: false, description: 'アイデア検索条件'
    argument :sort, Types::SortConditionType, required: false, default_value: { column_name: 'likes_num' }, description: 'ソート順'

    type Types::Idea::IdeasType, null: false

    def resolve(**args)
      ransack_params = build_ransack_params(args[:search_condition])

      search = ::Idea.published
                     .eager_load(%i[idea_tags taggings])
                     .preload(:user)
                     .ransack(ransack_params)

      search.sorts = args[:sort].to_ransack_condition
      paged_ideas = Kaminari.paginate_array(search.result).page(args[:page]).per(args[:per])
      to_paged_result(paged_ideas)
    end

    private

    def build_ransack_params(search_condition)
      search_params = search_condition&.arguments&.keyword_arguments || {}

      ransack_params = search_params.except(:stance_eq, :difficulty_eq)
      ransack_params[:stance_eq] = ::Idea.stances[search_params[:stance_eq]] if search_params.key?(:stance_eq)
      ransack_params[:difficulty_eq] = ::Idea.difficulties[search_params[:difficulty_eq]] if search_params.key?(:difficulty_eq)
      ransack_params
    end
  end
end
