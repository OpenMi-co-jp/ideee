# frozen_string_literal: true

module Resolvers::Concerns::Pagination
  extend ActiveSupport::Concern

  included do
    argument :page, GraphQL::Types::Int, required: false, default_value: 1, description: 'ページ番号'
    argument :per, GraphQL::Types::Int, required: false, default_value: 30, description: '1ページに表示するアイデア数'
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
