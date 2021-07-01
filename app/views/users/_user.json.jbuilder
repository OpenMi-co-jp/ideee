json.extract! user, :id, :name, :description, :point, :idea, :maker, :created_at, :updated_at
json.url user_url(user, format: :json)
