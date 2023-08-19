# frozen_string_literal: true

module Types
  class Idea::SearchConditionType < Types::BaseInputObject
    argument :name_or_idea_tags_name_cont, String, required: false, description: '名前かタグ名で検索'
    argument :difficulty_eq, Integer, required: false, description: '難易度で検索'
    argument :team_status_eq, Integer, required: false, description: 'チーム状態で検索'
    argument :published_at_gteq, GraphQL::Types::ISO8601DateTime, required: false, description: '指定公開日以降で検索'
    argument :published_at_lteq, GraphQL::Types::ISO8601DateTime, required: false, description: '指定公開日で以前で検索'
  end
end
