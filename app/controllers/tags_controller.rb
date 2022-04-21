class TagsController < ApplicationController
  def popular
    tag_list = Tag.recent_tags.popular_tags
    render partial: 'tags/popular_tags', locals: { tags: tag_list }
  end
end
