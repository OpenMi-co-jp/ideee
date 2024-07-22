# frozen_string_literal: true

module Types
  class Idea::AiIdeaTitlesType < Types::BaseObject
    field :title, String, null: false, description: 'AIアイデアタイトル'
  end
end
