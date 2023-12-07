# frozen_string_literal: true

class TagsController < ApplicationController
  def list
    tag_names = Tag.pluck(:name)
    tags_hash = tag_names.zip(Array.new(tag_names.length, nil)).to_h
    render json: tags_hash
  end
end
