# frozen_string_literal: true

json.extract! idea, :id, :name, :icon, :note, :view, :created_at, :updated_at
json.url idea_url(idea, format: :json)
