# frozen_string_literal: true

module Resolvers::Concerns::Pagination
  extend ActiveSupport::Concern

  # per を無制限にすると 1 リクエストで全件を読み込ませることができ、
  # max_complexity を回避したまま DB とメモリを枯渇させられるため上限を設ける
  MAX_PER = 100
  MAX_PAGE = 10_000
  DEFAULT_PER = 30
  public_constant :MAX_PER, :MAX_PAGE, :DEFAULT_PER

  # NOTE: prepare はメソッド名でも渡せるが、その場合は解決時に親オブジェクトを必要とし、
  #       Query 直下のフィールドでは Resolver のインスタンスメソッドが引けないため lambda を使う
  included do
    argument :page, GraphQL::Types::Int, required: false, default_value: 1, description: 'ページ番号',
             prepare: ->(value, _ctx) { value.to_i.clamp(1, MAX_PAGE) }
    argument :per, GraphQL::Types::Int, required: false, default_value: DEFAULT_PER,
             description: "1ページに表示するアイデア数（最大 #{MAX_PER}）",
             prepare: ->(value, _ctx) { value.to_i.clamp(1, MAX_PER) }
  end

  def to_paged_result(results)
    {
      nodes: results,
      page_info: page_info(results)
    }
  end

  protected

  def page_info(results)
    {
      total_count: results.total_count,
      per: results.limit_value,
      total_pages: results.total_pages,
      current_page: results.current_page,
      next_page: results.next_page,
      prev_page: results.prev_page,
      is_first: results.first_page?,
      is_last: results.last_page?
    }
  end
end
