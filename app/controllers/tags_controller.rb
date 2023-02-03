# frozen_string_literal: true

class TagsController < ApplicationController
  def popular
    tag_list = Tag.recent_tags.popular_tags
    render partial: 'tags/popular_tags', locals: { tags: tag_list }
  end

  def list
    tag_names = Tag.pluck(:name)
    tags_hash = tag_names.zip(Array.new(tag_names.length, nil)).to_h
    render json: tags_hash
  end
end
